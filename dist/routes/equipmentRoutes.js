"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _EquipmentController = require('../controllers/EquipmentController'); var _EquipmentController2 = _interopRequireDefault(_EquipmentController);

const router = new (0, _express.Router)();

router.get('/', _EquipmentController2.default.show);
router.post('/', _EquipmentController2.default.store);
router.put('/', _EquipmentController2.default.update);
router.delete('/', _EquipmentController2.default.delete);

exports. default = router;
