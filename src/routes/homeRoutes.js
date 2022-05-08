import { Router } from 'express';
import homeController from '../controllers/HomeController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', homeController.index);

export default router;
