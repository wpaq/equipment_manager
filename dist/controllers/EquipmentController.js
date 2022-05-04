"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _qrcode = require('qrcode'); var _qrcode2 = _interopRequireDefault(_qrcode);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _CreateQRCodeImageService = require('../services/CreateQRCodeImageService');

class EquipmentController {
    async index (req, res) {
        try {
            res.render('equipment', {
                equipment: {},
            });
        } catch (err) {
            return req.session.save(() => res.status(404).render('404'));
        }
    }

    async store(req, res) {
        try {
            // generate QRCodeImage
            const serviceQRCodeImage = new (0, _CreateQRCodeImageService.CreateQRCodeImageService)();
            const foto = await serviceQRCodeImage.create(req.body)

            const { tombo, equipamento, empresa, local, responsavel, configuracao, data_verificacao } = req.body;

            // insert in database
            const newEquipment = await _Equipment2.default.create({ tombo, equipamento, empresa, local, responsavel, configuracao, data_verificacao, foto });

            req.flash('success', 'Equipamento criado com sucesso.');
            req.session.save(() => res.redirect(`/equipment/index/${newEquipment.id}`));
            return;            
        } catch (e) {
            return req.session.save(() => res.render('404'));
        }
    };

    async editIndex(req, res) {
        try {
            const equipment = await _Equipment2.default.findByPk(req.params.id);

            if (!equipment) {
                return res.status(404).render('404');
            };           
            
            return res.render('equipment', { equipment });
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    }

    async update(req, res) {
        try {
            const equipment = await _Equipment2.default.findByPk(req.params.id);
            await equipment.update(req.body);
            console.log(req.body)

            if (!equipment) {
                req.flash('errors', 'Equipamento não existe.');
                req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
                return;
            };           
            
            req.flash('success', 'Equipamento atualizado com sucesso.');
            req.session.save(() => res.redirect(`/equipment/index/${req.params.id}`));
            return;            
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };

    async delete(req, res) {
        try {
            const equipment = await _Equipment2.default.findByPk(req.params.id);

            if (!equipment) {
                req.flash('errors', 'Equipamento não existe.');
                req.session.save(() => res.render('404'));
                return;
            }
            
            await equipment.destroy();
            req.flash('success', 'Equipamento deletado com sucesso');
            return req.session.save(() => res.status(200).redirect('/'));
        } catch (e) {
            return req.session.save(() => res.status(404).render('404'));
        }
    };
};

exports. default = new EquipmentController();
