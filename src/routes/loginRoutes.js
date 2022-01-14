import { Router } from 'express';
import loginController from '../controllers/LoginController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, loginController.index);

export default router;
