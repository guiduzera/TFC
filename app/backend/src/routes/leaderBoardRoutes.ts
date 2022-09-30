import { Router } from 'express';
import LeaderBoardControllers from '../controllers/LeaderBoard.controllers';
import LeaderBoardServices from '../services/leaderBoard.services';

const leaderBoardRoutes = Router();

const services = new LeaderBoardServices();

const controllers = new LeaderBoardControllers(services);

leaderBoardRoutes.get('/home', controllers.getHome);

leaderBoardRoutes.get('/away', controllers.getAway);

export default leaderBoardRoutes;
