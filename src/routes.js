import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer'
import UserContoller from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController';
import authMiddleware from './app/middlewares/auth';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController';

const routes = new Router()

const upload = multer(multerConfig);

routes.post('/users', UserContoller.store);
routes.post('/session', SessionController.store);

// Adicione esta linha no seu arquivo routes.js, junto com as outras rotas
routes.get('/test-auth', authMiddleware, (req, res) => {
    return res.json({ 
      success: true,
      userId: req.userId,
      headers: req.headers
    });
  });



routes.post('/products', authMiddleware, upload.single('file'), ProductController.store);
routes.get('/products', authMiddleware, ProductController.index)
routes.put('/products/:id', authMiddleware, upload.single('file'), ProductController.update);

routes.post('/categories', authMiddleware, upload.single('file'), CategoryController.store);
routes.get('/categories', authMiddleware, CategoryController.index)
routes.put('/categories/:id', authMiddleware, upload.single('file'), CategoryController.update);

routes.post('/orders', authMiddleware, OrderController.store)
routes.get('/orders', authMiddleware, OrderController.index)
routes.put('/orders/:id', authMiddleware, OrderController.update)

routes.post('/create-payment-intent', authMiddleware, CreatePaymentIntentController.store)

export default routes