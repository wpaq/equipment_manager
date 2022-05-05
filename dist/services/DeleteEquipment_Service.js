"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _QRCodeImage = require('../models/QRCodeImage'); var _QRCodeImage2 = _interopRequireDefault(_QRCodeImage);
var _equipmentConstants = require('../constants/equipmentConstants'); var _equipmentConstants2 = _interopRequireDefault(_equipmentConstants);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

 class DeleteEquipment_Service {
    async execute(equipmentId) {
        try {
            const equipment = await _Equipment2.default.findByPk(equipmentId);
            const equipmentQRCode = await _QRCodeImage2.default.findOne({ where: { equipment_id: equipmentId }});

            if (!equipment || !equipmentQRCode) {
                return _equipmentConstants2.default.equipmentDeleteError;
            };          
            
            await equipmentQRCode.destroy();
            await equipment.destroy();

            const outputFilepath =  `./public/assets/img/${equipmentId}.png`;
            _fs2.default.unlink(outputFilepath, function(err){
                if(err) return console.log(err);
            });
            
            return _equipmentConstants2.default.equipmentDeleteSuccess;
        } catch (err) {
            return console.log(err)
        }
    }

} exports.DeleteEquipment_Service = DeleteEquipment_Service;