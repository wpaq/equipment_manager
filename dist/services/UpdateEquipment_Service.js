"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _QRCodeImage = require('../models/QRCodeImage'); var _QRCodeImage2 = _interopRequireDefault(_QRCodeImage);
var _GenerateQRCodeImageBuffer_Service = require('./GenerateQRCodeImageBuffer_Service');
var _equipmentConstants = require('../constants/equipmentConstants'); var _equipmentConstants2 = _interopRequireDefault(_equipmentConstants);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

 class UpdateEquipment_Service {
    async execute(data, equipmentId) {
        try {
            // generate QRCodeImageBuffer Service
            const serviceQRCodeImageBuffer = new (0, _GenerateQRCodeImageBuffer_Service.GenerateQRCodeImageBuffer_Service)();
            const imageBuffer = await serviceQRCodeImageBuffer.create(data)

            const equipment = await _Equipment2.default.findByPk(equipmentId);
            await equipment.update(data);

            if (!equipment) {
                return _equipmentConstants2.default.equipmentNotFound;
            };           
            
            // generate new qrcode image            
            await _QRCodeImage2.default.update({ photo_data: imageBuffer }, { where: { equipment_id: equipmentId }}).then((res) => {
                const outputFilepath =  `./public/assets/img/${equipmentId}.png`;
                _fs2.default.writeFileSync(outputFilepath, imageBuffer, 'base64');  
            });
            
            return equipment.id;
        } catch (err) {
            return console.log(err)
        }
    }

} exports.UpdateEquipment_Service = UpdateEquipment_Service;