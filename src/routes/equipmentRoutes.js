import { Router } from 'express';
import equipmentController from '../app/controllers/EquipmentController';

const router = new Router();

router.get('/', equipmentController.index);
router.post('/', equipmentController.store);

export default router;
