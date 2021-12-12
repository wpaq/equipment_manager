import { Router } from 'express';
import loginController from '../app/controllers/LoginController';

const router = new Router();

router.get('/', loginController.index);

export default router;
