import { Router } from 'express';
import loginController from '../controllers/LoginController';

const router = new Router();

router.get('/', loginController.index);
router.get('/logout', loginController.logout);

export default router;
