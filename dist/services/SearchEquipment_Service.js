"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _sequelize = require('sequelize');

 class SearchEquipment_Service {
    async execute(query) {
        try {
            const equipments = await _Equipment2.default.findAll({ 
                where: { 
                  [_sequelize.Op.or]: [   
                    {
                      tombo: { 
                        [_sequelize.Op.iLike]: `%${query}%`   
                      }             
                    },  
                    {
                      equipamento: { 
                        [_sequelize.Op.iLike]: `%${query}%`
                      } 
                    },        
                    { 
                      responsavel: { 
                        [_sequelize.Op.iLike]: `%${query}%`
                      } 
                    },
                    {
                      local: { 
                        [_sequelize.Op.iLike]: `%${query}%`
                      } 
                    },
                    { 
                      empresa: { 
                        [_sequelize.Op.iLike]: `%${query}%`
                      } 
                    }
                  ]            
                }
            });

            if (equipments.length === 0) {
                req.flash('errors', 'Equipamento não encontrado');
                req.session.save(() => res.redirect('/equipment/show'));
                return;    
            }

            return equipments;
        } catch (err) {
            return console.log(err)
        }
    }

} exports.SearchEquipment_Service = SearchEquipment_Service;