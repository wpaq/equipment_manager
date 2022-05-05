import Equipment from "../models/Equipment";
import QRCodeImage from '../models/QRCodeImage';
import { GenerateQRCodeImageBuffer_Service } from './GenerateQRCodeImageBuffer_Service';

export class CreateEquipment_Service {
    async execute(data) {
        try {
            // generate QRCodeImageBuffer Service
            const serviceQRCodeImageBuffer = new GenerateQRCodeImageBuffer_Service();
            const foto = await serviceQRCodeImageBuffer.create(data)
 
            const { tombo, equipamento, empresa, local, responsavel, configuracao, data_verificacao } = data;

            // insert in database
            const newEquipment = await Equipment.create({ tombo, equipamento, empresa, local, responsavel, configuracao, data_verificacao, foto });
            const newQRCodeImage = await QRCodeImage.create({ photo_data: foto, equipment_id: newEquipment.id});
            
            return newEquipment.id;
        } catch (err) {
            return console.log(err)
        }
    }

}