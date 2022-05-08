"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _equipmentConstants = require('../constants/equipmentConstants'); var _equipmentConstants2 = _interopRequireDefault(_equipmentConstants);

var _GetAllQRCodeImages_Service = require('../services/GetAllQRCodeImages_Service');
var _SearchEquipment_Service = require('../services/SearchEquipment_Service');
var _CreateEquipment_Service = require('../services/CreateEquipment_Service');
var _UpdateEquipment_Service = require('../services/UpdateEquipment_Service');
var _DeleteEquipment_Service = require('../services/DeleteEquipment_Service');

class EquipmentController {
    async show (req, res) {
        try {
            const limiter = req.query.limit;
            const query_search = req.query.search;

            if (query_search) {
                const equipments = await new (0, _SearchEquipment_Service.SearchEquipment_Service)().execute(query_search); 

                return res.status(200).render('equipamentos', { equipments, title: 'Equipamentos' });
            }

            const { count, rows } = await _Equipment2.default.findAndCountAll({
              offset: 0,
              limit: limiter || 500,
              order: ['created_at']
            }); 
            

            const service = new (0, _GetAllQRCodeImages_Service.GetAllQRCodeImages_Service)();      
            await service.execute();  
    
            res.status(200).render('equipamentos', { equipments: rows, equipments_qtd: count , title: 'Equipamentos'});  
        } catch (err) {
            console.log(err)
        }
    }

    async index (req, res) {
        try {
            res.render('equipment', {
                equipment: {},
                title: 'Adicionar Equipamento'
            });
        } catch (err) {
            return req.session.save(() => res.status(404).render('404'));
        }
    }

    async store(req, res) {
        try {
            const service = new (0, _CreateEquipment_Service.CreateEquipment_Service)();
            const newEquipment = await service.execute(req.body);
            
            req.flash('success', _equipmentConstants2.default.equipmentSuccess);
            req.session.save(() => res.status(200).redirect(`/equipment/index/${newEquipment}/?title='Editar Equipamento`));
            return;            
        } catch (err) {
            return req.session.save(() => res.status(400).render('404'));
        }
    };

    async update(req, res) {
        try {
            const service = new (0, _UpdateEquipment_Service.UpdateEquipment_Service)();
            const updateEquipment = await service.execute(req.body, req.params.id);

            if (!updateEquipment == _equipmentConstants2.default.equipmentNotFound) {
                req.flash('errors', _equipmentConstants2.default.equipmentNotFound);
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return;
            };           
            
            req.flash('success', _equipmentConstants2.default.equipmentUpdateSuccess);
            req.session.save(() => res.redirect(`/equipment/index/${updateEquipment}`));
            return;            
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };

    async delete(req, res) {
        try {
            const service = new (0, _DeleteEquipment_Service.DeleteEquipment_Service)();
            const deleteEquipment = await service.execute(req.params.id);

            if (deleteEquipment != _equipmentConstants2.default.equipmentDeleteSuccess) {
                req.flash('errors', _equipmentConstants2.default.equipmentDeleteError);
                req.session.save(() => res.render('404'));
                return;
            }
            
            req.flash('success', _equipmentConstants2.default.equipmentDeleteSuccess);
            return req.session.save(() => res.status(200).redirect('/'));
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };

    async editIndex(req, res) {
        try {
            const equipment = await _Equipment2.default.findByPk(req.params.id);

            if (!equipment) {
                return res.status(404).render('404');
            };           
            
            return res.render('equipment', { 
                equipment,
                title: 'Editar Equipamento'
            });
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    }
};

exports. default = new EquipmentController();
