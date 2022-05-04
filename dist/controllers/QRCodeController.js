"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _QRCodeImage = require('../models/QRCodeImage'); var _QRCodeImage2 = _interopRequireDefault(_QRCodeImage);

var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

class QRCodeController {
  async store(req, res) {
      try {
        const filepath = './public/assets/img/equipment.png';
        const photo_data = Buffer.from(_fs2.default.readFileSync(filepath));

        console.log(photo_data)
        console.log("")
        

        // const qrcode = await QRCodeImage.create(image);

        const newPhoto = await _QRCodeImage2.default.create({ photo_data });

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