"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _qrcode = require('qrcode'); var _qrcode2 = _interopRequireDefault(_qrcode);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

 class CreateQRCodeImageService {
    async create(obj) {
        try {
            // filepath to save qrcode image
            const filepath = './public/assets/img/qrcode.png';

            // format obj value
            delete obj._csrf;
            const data = JSON.stringify(obj);
            const dataFormated = data.toUpperCase()
                .replace(/\{/g, "")
                .replace(/\}/g, "")
                .replace(/\"/g, "")
                .replace(/\,/g, "\n")
                .replace(/\:/g, ": ");

            await _qrcode2.default.toFile(filepath, dataFormated);      
            const qrcode_photo = Buffer.from(_fs2.default.readFileSync(filepath));

            return qrcode_photo;
        } catch (err) {
            return console.log(err)
        }        
    }
} exports.CreateQRCodeImageService = CreateQRCodeImageService;