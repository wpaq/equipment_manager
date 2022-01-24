import { Router } from 'express';
import homeController from '../controllers/HomeController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, homeController.index);
router.get('/index', loginRequired, homeController.search);

export default router;
