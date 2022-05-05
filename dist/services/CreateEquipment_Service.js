"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _QRCodeImage = require('../models/QRCodeImage'); var _QRCodeImage2 = _interopRequireDefault(_QRCodeImage);
var _GenerateQRCodeImageBuffer_Service = require('./GenerateQRCodeImageBuffer_Service');

 class CreateEquipment_Service {
    async execute(data) {
        try {
            // generate QRCodeImageBuffer Service
            const serviceQRCodeImageBuffer = new (0, _GenerateQRCodeImageBuffer_Service.GenerateQRCodeImageBuffer_Service)();
            const imageBuffer = await serviceQRCodeImageBuffer.create(data)

            // insert in database
            const newEquipment = await _Equipment2.default.create(data);
            const newQRCodeImage = await _QRCodeImage2.default.create({ photo_data: imageBuffer, equipment_id: newEquipment.id});
            
            return newEquipment.id;
        } catch (err) {
            return console.log(err)
        }
    }

} exports.CreateEquipment_Service = CreateEquipment_Service;