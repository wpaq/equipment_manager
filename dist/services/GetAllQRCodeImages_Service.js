"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _QRCodeImage = require('../models/QRCodeImage'); var _QRCodeImage2 = _interopRequireDefault(_QRCodeImage);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

 class GetAllQRCodeImages_Service {
    async execute(qtd_limit) {
        try {
            const QRCodeImages = await _QRCodeImage2.default.findAll({
                offset: 0,
                limit: qtd_limit
            });

            QRCodeImages.forEach(images => {
                // caminho onde salva as imagens
                const outputFilepath =  `./public/assets/img/${images.equipment_id}.png`;
      
                // verificar se imagem já foi salva no server local
                _fs2.default.access(outputFilepath, _fs2.default.constants.F_OK, (img) => {           
                  if (img) {       
                    // verifica se existe imagem cadastrada no database    
                    if (images.photo_data) {
                      // converte o arquivo blob do database para imagem e salva no server local
                      _fs2.default.writeFileSync(outputFilepath, images.photo_data, 'base64');
                    }
                  }
                });
            })  

            return;
        } catch (err) {
            return console.log(err)
        }        
    }
} exports.GetAllQRCodeImages_Service = GetAllQRCodeImages_Service;