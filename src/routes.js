import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer'
import UserContoller from './app/controllrs/UserController'
import SessionController from './app/controllrs/SessionController';
import ProductController from './app/controllrs/ProductController';

const routes = new Router()

const upload = multer(multerConfig)

routes.post('/users', UserContoller.store);
routes.post('/session', SessionController.store);
routes.post('/products', upload.single('file'), ProductController.store);

export default routes