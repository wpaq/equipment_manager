import { Router } from 'express';
import EquipmentController from '../controllers/EquipmentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/index', loginRequired, EquipmentController.index);
router.post('/register', loginRequired, EquipmentController.store);
router.get('/index/:id', loginRequired, EquipmentController.editIndex);
router.post('/edit/:id', loginRequired, EquipmentController.update);
router.delete('/delete/:id', loginRequired, EquipmentController.delete);

export default router;
