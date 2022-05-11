"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _equipmentConstants = require('../constants/equipmentConstants'); var _equipmentConstants2 = _interopRequireDefault(_equipmentConstants);
var _sequelize = require('sequelize');

 class SearchEquipment_Service {
    async execute(querys) {
        try {

              const equipments = await _Equipment2.default.findAll({ 
                  where: { 
                    [_sequelize.Op.or]: [   
                      {
                        tombo: { 
                          [_sequelize.Op.iLike]: `%${querys.search}%`   
                        }             
                      },  
                      {
                        equipamento: { 
                          [_sequelize.Op.iLike]: `%${querys.search}%`
                        } 
                      },        
                      { 
                        responsavel: { 
                          [_sequelize.Op.iLike]: `%${querys.search}%`
                        } 
                      },
                      {
                        local: { 
                          [_sequelize.Op.iLike]: `%${querys.search}%`
                        } 
                      },
                      { 
                        empresa: { 
                          [_sequelize.Op.iLike]: `%${querys.search}%`
                        } 
                      },
                      {
                        [_sequelize.Op.and]: [
                          {
                            equipamento: { [_sequelize.Op.iLike]: `%${querys.equipamento}%` }
                          },
                          {
                            empresa: { [_sequelize.Op.iLike]: `%${querys.empresa}%` }
                          },
                          {
                            local: { [_sequelize.Op.iLike]: `%${querys.local}%` }
                          }
                        ] 
                      }
                    ],           
                  }
              });

            if (equipments.length === 0) {
              return _equipmentConstants2.default.equipmentNotFound;    
            }

            return equipments;
        } catch (err) {
          console.log(err)
          return _equipmentConstants2.default.equipmentSearchError;
        }
    }
} exports.SearchEquipment_Service = SearchEquipment_Service;