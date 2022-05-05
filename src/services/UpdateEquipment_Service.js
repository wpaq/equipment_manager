import Equipment from "../models/Equipment";
import QRCodeImage from '../models/QRCodeImage';
import { GenerateQRCodeImageBuffer_Service } from './GenerateQRCodeImageBuffer_Service';
import equipmentConstants from "../constants/equipmentConstants";
import fs from 'fs';

export class UpdateEquipment_Service {
    async execute(data, equipmentId) {
        try {
            // generate QRCodeImageBuffer Service
            const serviceQRCodeImageBuffer = new GenerateQRCodeImageBuffer_Service();
            const imageBuffer = await serviceQRCodeImageBuffer.create(data)

            const equipment = await Equipment.findByPk(equipmentId);
            await equipment.update(data);

            if (!equipment) {
                return equipmentConstants.equipmentNotFound;
            };           
            
            // generate new qrcode image            
            await QRCodeImage.update({ photo_data: imageBuffer }, { where: { equipment_id: equipmentId }}).then((res) => {
                const outputFilepath =  `./public/assets/img/${equipmentId}.png`;
                fs.writeFileSync(outputFilepath, imageBuffer, 'base64');  
            });
            
            return equipment.id;
        } catch (err) {
            return console.log(err)
        }
    }

}