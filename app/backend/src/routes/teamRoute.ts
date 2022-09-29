import { Router } from 'express';
import TeamServices from '../services/Team.services';
import TeamControllers from '../controllers/Team.controllers';

const teamRouter = Router();

const teamServices = new TeamServices();

const teamControllers = new TeamControllers(teamServices);

teamRouter.get('/', teamControllers.getAll);

teamRouter.get('/:id', teamControllers.getById);

export default teamRouter;

// como colocar na interface que o atributo tem que sert privado
