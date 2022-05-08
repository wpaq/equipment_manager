"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _equipmentConstants = require('../constants/equipmentConstants'); var _equipmentConstants2 = _interopRequireDefault(_equipmentConstants);
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
                req.flash('errors', _equipmentConstants2.default.equipmentNotFound);
                req.session.save(() => res.redirect('/equipment/show'));
                return;    
            }

            return equipments;
        } catch (err) {
            req.flash('errors', _equipmentConstants2.default.equipmentSearchError);
            req.session.save(() => res.redirect('/equipment/show'));
            return;    
        }
    }

} exports.SearchEquipment_Service = SearchEquipment_Service;