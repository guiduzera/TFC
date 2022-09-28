import { Router } from 'express';
import JWT from '../helpers/JWT';
import UserControllers from '../controllers/User.controllers';
import UserServices from '../services/User.services';
import Bcrypt from '../helpers/Bcrypt';

const loginRouter = Router();

const jwt = new JWT();
const bcrypt = new Bcrypt();
const service = new UserServices(jwt, bcrypt);
const controller = new UserControllers(service);

loginRouter.post('/', controller.login);

export default loginRouter;
