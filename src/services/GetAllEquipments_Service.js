import Equipment from "../models/Equipment";
import QRCodeImage from '../models/QRCodeImage';
import { GenerateQRCodeImageBuffer_Service } from './GenerateQRCodeImageBuffer_Service';

export class CreateEquipment_Service {
    async execute(data) {
        try {
            // generate QRCodeImageBuffer Service
            const serviceQRCodeImageBuffer = new GenerateQRCodeImageBuffer_Service();
            const imageBuffer = await serviceQRCodeImageBuffer.create(data)

            // insert in database
            const newEquipment = await Equipment.create(data);
            const newQRCodeImage = await QRCodeImage.create({ photo_data: imageBuffer, equipment_id: newEquipment.id});
            
            return newEquipment.id;
        } catch (err) {
            return console.log(err)
        }
    }

}