import { Router } from 'express';
import Validations from '../middlewares/validations.middlewares';
import MatchesServices from '../services/Matches.services';
import MatchesControllers from '../controllers/Matches.controllers';
import JWT from '../helpers/JWT';

const matchRoute = Router();

const jwt = new JWT();

const validations = new Validations(jwt);

const service = new MatchesServices();

const controller = new MatchesControllers(service);

matchRoute.get('/', controller.getAll);

matchRoute.post('/', validations.TokenVerifyMatches, controller.createMatch);

matchRoute.patch('/:id/finish', validations.TokenVerifyMatches, controller.updateInProgress);

matchRoute.patch('/:id', validations.TokenVerifyMatches, controller.updateById);

export default matchRoute;
