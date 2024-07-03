import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer'
import UserContoller from './app/controllrs/UserController'
import SessionController from './app/controllrs/SessionController';
import ProductController from './app/controllrs/ProductController';
import authMiddleware from './middlewares/auth';
import CategoryController from './app/controllrs/CategoryController';

const routes = new Router()

const upload = multer(multerConfig)

routes.post('/users', UserContoller.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index)

export default routes