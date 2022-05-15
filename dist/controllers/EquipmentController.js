"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _equipmentConstants = require('../constants/equipmentConstants'); var _equipmentConstants2 = _interopRequireDefault(_equipmentConstants);

var _GetAllQRCodeImages_Service = require('../services/GetAllQRCodeImages_Service');
var _GetAllEquipments_Service = require('../services/GetAllEquipments_Service');
var _SearchEquipment_Service = require('../services/SearchEquipment_Service');
var _CreateEquipment_Service = require('../services/CreateEquipment_Service');
var _UpdateEquipment_Service = require('../services/UpdateEquipment_Service');
var _DeleteEquipment_Service = require('../services/DeleteEquipment_Service');

class EquipmentController {
    async show (req, res) {
        try {
            const limiter = req.query.limit;

            for (var key in req.query) {
                if (req.query[key] != '') {
                    const equipments = await new (0, _SearchEquipment_Service.SearchEquipment_Service)().execute(req.query); 

                    if (equipments === _equipmentConstants2.default.equipmentNotFound) {
                        req.flash('errors', _equipmentConstants2.default.equipmentNotFound);
                        req.session.save(() => res.redirect('/equipment/show'));
                        return;   
                    }

                    return res.status(200).render('equipamentos', { 
                        equipments, 
                        title: 'Equipamentos',
                       querys: 1
                    });
                }
            }

            const equipments = await new (0, _GetAllEquipments_Service.GetAllEquipments_Service)().execute();
            await new (0, _GetAllQRCodeImages_Service.GetAllQRCodeImages_Service)().execute();      
    
            return res.status(200).render('equipamentos', { 
                equipments: equipments.rows, 
                equipments_qtd: equipments.count, 
                title: 'Equipamentos',
                querys: 0
            });  
        } catch (err) {
            req.flash('errors', _equipmentConstants2.default.equipmentSearchError);
            req.session.save(() => res.redirect('/equipment/show'));
            return;   
        }
    }

    async index (req, res) {
        try {
            return res.status(200).render('equipment', {
                equipment: {},
                title: 'Adicionar Equipamento'
            });
        } catch (err) {
            req.flash('errors', _equipmentConstants2.default.equipmentStoreError);
            req.session.save(() => res.redirect('/equipment/index'));
            return;   
        }
    }

    async store(req, res) {
        try {
            const newEquipment = await new (0, _CreateEquipment_Service.CreateEquipment_Service)().execute(req.body);
            
            req.flash('success', _equipmentConstants2.default.equipmentStoreSuccess);
            req.session.save(() => res.status(200).redirect(`/equipment/index/${newEquipment}/?title='Editar Equipamento`));
            return;            
        } catch (err) {
            req.flash('errors', _equipmentConstants2.default.equipmentStoreError);
            req.session.save(() => res.redirect('/equipment/index'));
            return;  
        }
    };

    async update(req, res) {
        try {
            const updateEquipment = await new (0, _UpdateEquipment_Service.UpdateEquipment_Service)().execute(req.body, req.params.id);

            if (!updateEquipment == _equipmentConstants2.default.equipmentNotFound) {
                req.flash('errors', _equipmentConstants2.default.equipmentNotFound);
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return;
            };           
            
            req.flash('success', _equipmentConstants2.default.equipmentUpdateSuccess);
            req.session.save(() => res.redirect(`/equipment/index/${updateEquipment}`));
            return;            
        } catch (err) {
            req.flash('errors', _equipmentConstants2.default.equipmentUpdateError);
            req.session.save(() => res.redirect('/equipment/index'));
            return;  
        }
    };

    async delete(req, res) {
        try {
            const deleteEquipment = await new (0, _DeleteEquipment_Service.DeleteEquipment_Service)().execute(req.params.id);

            if (deleteEquipment != _equipmentConstants2.default.equipmentDeleteSuccess) {
                req.flash('errors', _equipmentConstants2.default.equipmentDeleteError);
                req.session.save(() => res.status(400).redirect('/equipment/show'));
                return;
            }
            
            req.flash('success', _equipmentConstants2.default.equipmentDeleteSuccess);
            return req.session.save(() => res.status(200).redirect('/equipment/show'));
        } catch (err) {
            req.flash('errors', _equipmentConstants2.default.equipmentDeleteError);
            req.session.save(() => res.status(400).redirect('/equipment/show'));
            return; 
        }
    };

    async editIndex(req, res) {
        try {
            const equipment = await _Equipment2.default.findByPk(req.params.id);

            if (!equipment) {
                req.flash('errors', _equipmentConstants2.default.equipmentNotFound);
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return; 
            };           
            
            return res.render('equipment', { 
                equipment,
                title: 'Editar Equipamento'
            });
        } catch (err) {
            req.flash('errors', _equipmentConstants2.default.equipmentUpdateError);
            req.session.save(() => res.redirect(`/equipment/index`));
            return; 
        }
    }
};

exports. default = new EquipmentController();
