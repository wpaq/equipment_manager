"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _QRCodeController = require('../controllers/QRCodeController'); var _QRCodeController2 = _interopRequireDefault(_QRCodeController);

const router = new (0, _express.Router)();

router.get('/', _QRCodeController2.default.store);

exports. default = router;
