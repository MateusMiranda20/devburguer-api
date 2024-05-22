import { Router } from 'express';
import UserContoller from './app/controllrs/UserController'
import SessionController from './app/controllrs/SessionController';

const routes = new Router()

routes.post('/users', UserContoller.store);
routes.post('/session', SessionController.store);

export default routes