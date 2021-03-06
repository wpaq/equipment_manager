"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _LoginController = require('../controllers/LoginController'); var _LoginController2 = _interopRequireDefault(_LoginController);

const router = new (0, _express.Router)();

router.get('/', _LoginController2.default.index);
router.get('/logout', _LoginController2.default.logout);

exports. default = router;
