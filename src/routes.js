import { Router } from 'express';
import UserContoller from './app/controllrs/UserController'

const routes = new Router()

routes.post('/users', UserContoller.store);

export default routes