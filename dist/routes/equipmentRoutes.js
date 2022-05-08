"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _EquipmentController = require('../controllers/EquipmentController'); var _EquipmentController2 = _interopRequireDefault(_EquipmentController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/index', _EquipmentController2.default.index);
router.get('/show', _EquipmentController2.default.show);
router.post('/register', _EquipmentController2.default.store);
router.get('/index/:id', _EquipmentController2.default.editIndex);
router.post('/edit/:id', _EquipmentController2.default.update);
router.get('/delete/:id', _EquipmentController2.default.delete);

exports. default = router;
