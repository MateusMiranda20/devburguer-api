import * as Yup from 'yup';
import Product from '../models/Products';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        if (!request.file) {
            return response.status(400).json({ error: 'File is required' });
        }

        const { filename: path } = request.file;
        const { name, price, category_id, offer } = request.body;

        const product = await Product.create({
            name,
            price,
            category_id,
            path,
            offer,
        });

        return response.status(201).json(product);
    }

    async index(request, response) {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
            ],
        });

        return response.json(products);
    }

    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = request.params;
        const findProduct = await Product.findByPk(id);

        if (!findProduct) {
            return response.status(400).json({ error: 'Product not found' });
        }

        const { name, price, category_id, offer } = request.body;

        const updateData = {
            name,
            price,
            category_id,
            offer,
        };

        if (request.file) {
            updateData.path = request.file.filename;
        }

        await Product.update(updateData, {
            where: { id },
        });

        const updatedProduct = await Product.findByPk(id);

        return response.status(200).json(updatedProduct);
    }
}

export default new ProductController();
