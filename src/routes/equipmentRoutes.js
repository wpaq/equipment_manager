import { Router } from 'express';
import EquipmentController from '../controllers/EquipmentController';

const router = new Router();

router.get('/', EquipmentController.index);
router.get('/', EquipmentController.show);
router.post('/', EquipmentController.store);
router.put('/:id', EquipmentController.update);
router.delete('/', EquipmentController.delete);

export default router;
