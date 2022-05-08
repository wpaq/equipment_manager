import Equipment from "../models/Equipment";
import equipmentConstants from '../constants/equipmentConstants';
import { Op } from 'sequelize';

export class SearchEquipment_Service {
    async execute(query) {
        try {
            const equipments = await Equipment.findAll({ 
                where: { 
                  [Op.or]: [   
                    {
                      tombo: { 
                        [Op.iLike]: `%${query}%`   
                      }             
                    },  
                    {
                      equipamento: { 
                        [Op.iLike]: `%${query}%`
                      } 
                    },        
                    { 
                      responsavel: { 
                        [Op.iLike]: `%${query}%`
                      } 
                    },
                    {
                      local: { 
                        [Op.iLike]: `%${query}%`
                      } 
                    },
                    { 
                      empresa: { 
                        [Op.iLike]: `%${query}%`
                      } 
                    }
                  ]            
                }
            });

            if (equipments.length === 0) {
                req.flash('errors', equipmentConstants.equipmentNotFound);
                req.session.save(() => res.redirect('/equipment/show'));
                return;    
            }

            return equipments;
        } catch (err) {
            req.flash('errors', equipmentConstants.equipmentSearchError);
            req.session.save(() => res.redirect('/equipment/show'));
            return;    
        }
    }

}