import QRCodeImage from '../models/QRCodeImage';
import fs from 'fs';

export class GetAllQRCodeImages_Service {
    async execute(qtd_limit) {
        try {
            const QRCodeImages = await QRCodeImage.findAll({
                attributes: { exclude: ['created_at', 'updated_at'] },
                offset: 0,
                limit: qtd_limit
            });

            QRCodeImages.forEach(images => {
                // caminho onde salva as imagens
                const outputFilepath =  `./public/assets/img/${images.equipment_id}.png`;
      
                // verificar se imagem já foi salva no server local
                fs.access(outputFilepath, fs.constants.F_OK, (img) => {           
                  if (img) {       
                    // verifica se existe imagem cadastrada no database    
                    if (images.photo_data) {
                      // converte o arquivo blob do database para imagem e salva no server local
                      fs.writeFileSync(outputFilepath, images.photo_data, 'base64');
                    }
                  }
                });
            })  

            return;
        } catch (err) {
            return console.log(err)
        }        
    }
}