import Sequelize from "sequelize";

import configDatabase from '../config/database'

import User from "../app/models/User"
import Product from "../app/models/Products";
import Category from "../app/models/Category";

const models = [User, Product, Category]

class Database {
    constructor() {
        this.init();
    }

    //Aqui nos inicia as conexões do banco com o back 
    init() {
        this.connection = new Sequelize(configDatabase);
        models
        .map((models) => models.init(this.connection))
        .map(
        (model) => model.associate && model.associate(this.connection.models))// vamos avisar que existem os relacionamentos;
    }
}

export default new Database();