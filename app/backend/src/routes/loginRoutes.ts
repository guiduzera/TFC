import { Router } from 'express';
import JWT from '../helpers/JWT';
import UserControllers from '../controllers/User.controllers';
import UserServices from '../services/User.services';
import Bcrypt from '../helpers/Bcrypt';
import Validations from '../middlewares/validations.middlewares';

const loginRouter = Router();

const jwt = new JWT();
const bcrypt = new Bcrypt();
const validations = new Validations(jwt);
const service = new UserServices(jwt, bcrypt);
const controller = new UserControllers(service);

loginRouter.post('/', Validations.loginValidation, controller.login);

loginRouter.get('/validate', validations.TokenVerify);

export default loginRouter;
