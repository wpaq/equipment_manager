import multer from 'multer';
import multerConfig from '../config/multer';

import QRCodeImage from '../models/QRCodeImage';

const uploud = multer(multerConfig).single('photo');

class QRCodeController {
  async store(req, res) {
      try {
        const image = 'F:\Meus Projetos\node\equipment_manager\public\assets\img\equipment.png';
        const qrcode = await QRCodeImage.create(image);

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

export default new QRCodeController();