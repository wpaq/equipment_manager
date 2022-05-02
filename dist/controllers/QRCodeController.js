"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _QRCodeImage = require('../models/QRCodeImage'); var _QRCodeImage2 = _interopRequireDefault(_QRCodeImage);

const uploud = _multer2.default.call(void 0, _multer4.default).single('photo');

class QRCodeController {
  async store(req, res) {
      try {
        const image = 'F:\Meus Projetos\node\equipment_manager\public\assets\img\equipment.png';
        const qrcode = await _QRCodeImage2.default.create(image);

        console.log('aaaaaaa')

        return console.log('enviado');
      } catch (e) {
          console.log(e)
        return res.status(400).json({
          errors: ['Equipamento não existe'],
        });
      }
  }
}

exports. default = new QRCodeController();