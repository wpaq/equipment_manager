"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _EquipmentController = require('../controllers/EquipmentController'); var _EquipmentController2 = _interopRequireDefault(_EquipmentController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/index', _loginRequired2.default, _EquipmentController2.default.index);
router.post('/register', _loginRequired2.default, _EquipmentController2.default.store);
router.get('/index/:id', _loginRequired2.default, _EquipmentController2.default.editIndex);
router.post('/edit/:id', _loginRequired2.default, _EquipmentController2.default.update);
router.get('/delete/:id', _loginRequired2.default, _EquipmentController2.default.delete);

exports. default = router;
