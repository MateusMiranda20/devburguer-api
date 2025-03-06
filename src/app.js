import express from 'express';
import routes from './routes';
import { resolve } from 'node:path'
import cors from 'cors'
import 'dotenv/config';


import './database';
class App {
  constructor() {
    this.app = express()
    this.app.use(cors({
      origin: "https://hamburgueria-front-n5tv.vercel.app", // Substitua pela URL do frontend
      methods: "get,post,put,delete",
      credentials: true, // Permite cookies e headers de autenticação
    }));
    

    this.middlewares()

    this.routes()
  }

  middlewares() {
    this.app.use(express.json())

    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads'))
    );

    this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads'))
    );
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app