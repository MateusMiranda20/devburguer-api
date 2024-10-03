import * as Yup from 'yup'
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { name } = request.body

        const user = await User.findByPk(request.UserId);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        const { admin: isAdmin } = user;

        if (!isAdmin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }


        const categoryExists = await Category.findOne({
            where: {
                name,
            },
        });

        if (categoryExists) {
            return response.status(400).json({ error: 'Category already exists.' })
        }

        const { filename: path } = request.file

        const { id } = await Category.create({
            name,
            path
        })

        return response.status(201).json({ id, name })
    }

    async index(request, response) {
        const categories = await Category.findAll();

        return response.json(categories)
    }

    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
        });
    
        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
    
        const { admin: isAdmin } = await User.findByPk(request.UserId);
    
        if (!isAdmin) {
            return response.status(401).json();
        }
    
        const { name } = request.body;
        const { id } = request.params;
    
        const categoryExist = await Category.findByPk(id);
    
        if (!categoryExist) {
            return response.status(400).json({ error: "Make sure your ID is correct" });
        }
    
        if (name) {
            const categoryExists = await Category.findOne({
                where: {
                    name,
                },
            });
    
            if (categoryExists && categoryExists.id !== +id) {
                return response.status(400).json({ error: 'Category already exists.' });
            }
        }
    
        let path;
        if (request.file) {
            path = request.file.filename;
        }
    
        await Category.update({
            name,
            path,
        }, {
            where: {
                id,
            },
        });
    
        return response.status(200).json();
    }
    
}

export default new CategoryController();