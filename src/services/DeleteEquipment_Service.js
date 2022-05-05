import Equipment from "../models/Equipment";
import QRCodeImage from "../models/QRCodeImage";
import equipmentConstants from "../constants/equipmentConstants";
import fs from 'fs';

export class DeleteEquipment_Service {
    async execute(equipmentId) {
        try {
            const equipment = await Equipment.findByPk(equipmentId);
            const equipmentQRCode = await QRCodeImage.findOne({ where: { equipment_id: equipmentId }});

            if (!equipment || !equipmentQRCode) {
                return equipmentConstants.equipmentDeleteError;
            };          
            
            await equipmentQRCode.destroy();
            await equipment.destroy();

            const outputFilepath =  `./public/assets/img/${equipmentId}.png`;
            fs.unlink(outputFilepath, function(err){
                if(err) return console.log(err);

           });
            
            return equipmentConstants.equipmentDeleteSuccess;
        } catch (err) {
            return console.log(err)
        }
    }

}