import QRCode from 'qrcode';
import fs from 'fs';

export class CreateQRCodeImageService {
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

            await QRCode.toFile(filepath, dataFormated);      
            const qrcode_photo = Buffer.from(fs.readFileSync(filepath));

            return qrcode_photo;
        } catch (err) {
            return console.log(err)
        }        
    }
}