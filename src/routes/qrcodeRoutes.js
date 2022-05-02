import { Router } from 'express';
import QRCodeController from '../controllers/QRCodeController';

const router = new Router();

router.get('/', QRCodeController.store);

export default router;
