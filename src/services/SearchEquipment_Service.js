import Equipment from "../models/Equipment";
import equipmentConstants from '../constants/equipmentConstants';
import { Op } from 'sequelize';

export class SearchEquipment_Service {
    async execute(querys) {
        try {

              const equipments = await Equipment.findAll({ 
                  where: { 
                    [Op.or]: [   
                      {
                        tombo: { 
                          [Op.iLike]: `%${querys.search}%`   
                        }             
                      },  
                      {
                        equipamento: { 
                          [Op.iLike]: `%${querys.search}%`
                        } 
                      },        
                      { 
                        responsavel: { 
                          [Op.iLike]: `%${querys.search}%`
                        } 
                      },
                      {
                        local: { 
                          [Op.iLike]: `%${querys.search}%`
                        } 
                      },
                      { 
                        empresa: { 
                          [Op.iLike]: `%${querys.search}%`
                        } 
                      },
                      {
                        [Op.and]: [
                          {
                            equipamento: { [Op.iLike]: `%${querys.equipamento}%` }
                          },
                          {
                            empresa: { [Op.iLike]: `%${querys.empresa}%` }
                          },
                          {
                            local: { [Op.iLike]: `%${querys.local}%` }
                          }
                        ] 
                      }
                    ],           
                  }
              });

            if (equipments.length === 0) {
              return equipmentConstants.equipmentNotFound;    
            }

            return equipments;
        } catch (err) {
          console.log(err)
          return equipmentConstants.equipmentSearchError;
        }
    }
}