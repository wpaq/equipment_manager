import QRCode from 'qrcode';
import fs from 'fs';

export class GenerateQRCodeImageBuffer_Service {
    async create(obj) {
        try {
            // filepath to save qrcode image
            const filepath = './public/assets/img/qrcode.png';

            // format obj value
            delete obj._csrf;
            const data = JSON.stringify(obj);
            const dataFormated = data.toUpperCase()
                .replace(/\{"/g, "")
                .replace(/\":"/g, ": ")
                .replace(/\","/g, "\n-----\n")
                .replace(/\"}/g, "")
                .replace(/\\R/g, "").replace(/\\N/g, "\n")
                .replace(/\ALUGADO: 1/g, "ALUGADO: SIM").replace(/\ALUGADO: 0/g, "ALUGADO: NÃO")
            

            // generate qrcode image
            await QRCode.toFile(filepath, dataFormated);      
            const QRCodeBuffer = Buffer.from(fs.readFileSync(filepath));

            return QRCodeBuffer;
        } catch (err) {
            return console.log(err)
        }        
    }
}