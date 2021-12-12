import { Router } from 'express';
import homeController from '../app/controllers/HomeController';

const router = new Router();

router.get('/', homeController.index);

export default router;
