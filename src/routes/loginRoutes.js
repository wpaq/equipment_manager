import { Router } from 'express';
import loginController from '../controllers/LoginController';

const router = new Router();

router.get('/', loginController.index);

export default router;
