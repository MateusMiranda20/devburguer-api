import Sequelize from "sequelize";
import mongoose from "mongoose";
import configDatabase from '../config/database'

import User from "../app/models/User"
import Product from "../app/models/Products";
import Category from "../app/models/Category";
import 'dotenv/config';

const models = [User, Product, Category]

class Database {
    constructor() {
        this.init();
        this.mongo()
    }

    //Aqui nos inicia as conexões do banco com o back 
    init() {
        this.connection = new Sequelize(configDatabase)
        models
            .map((models) => models.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models))// vamos avisar que existem os relacionamentos;
                console.log(configDatabase);

    }

    async mongo() {
        this.mongoConnection = await mongoose.connect(process.env.MONGO_URI, {
        })
        .then(() => console.log('🔥 MongoDB Atlas conectado com sucesso!'))
        .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));
    }
}
export default new Database();