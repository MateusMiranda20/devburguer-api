import Sequelize, { Model } from 'sequelize';

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.DECIMAL(10, 2), // Alterado para DECIMAL
                path: {
                    type: Sequelize.STRING,
                    allowNull: false, // Garante que o path não seja nulo
                    validate: {
                    notEmpty: true, // Valida que o campo não esteja vazio
                    },
                },
                offer: Sequelize.BOOLEAN,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        const baseUrl = process.env.APP_URL || 'http://localhost:3001';
                        return `${baseUrl}/product-file/${this.path}`;
                    },
                },
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        });
    }
}

export default Product;
