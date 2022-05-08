import { Router } from 'express';
import EquipmentController from '../controllers/EquipmentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/index', EquipmentController.index);
router.get('/show', EquipmentController.show);
router.post('/register', EquipmentController.store);
router.get('/index/:id', EquipmentController.editIndex);
router.post('/edit/:id', EquipmentController.update);
router.get('/delete/:id', EquipmentController.delete);

export default router;
