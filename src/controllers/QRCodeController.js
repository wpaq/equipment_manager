import QRCodeImage from '../models/QRCodeImage';

import fs from 'fs';

class QRCodeController {
  async store(req, res) {
      try {
        
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