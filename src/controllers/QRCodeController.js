import multer from 'multer';
import multerConfig from '../config/multer';

import qrcode from 'qrcode';

import QRCodeImage from '../models/QRCodeImage';

const uploud = multer(multerConfig).single('photo');

class QRCodeController {
    store(req, res) {
        return uploud(req, res, async (err) => {

          try {
            const originalname = 'pão';
            const filename = 'aaaa.png';            
            const equipment_id  = '17995e28-0bcb-4af6-bdc3-efda9caab726';
        
            const photo = await QRCodeImage.create( filename );
        
            return res.json(photo);
          } catch (e) {
              console.log(e)
            return res.status(400).json({
              errors: ['não existe'],
            });
          }
          
        })
   }
}


export default new QRCodeController();