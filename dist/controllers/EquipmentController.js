"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);

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
            const newEquipment = await _Equipment2.default.create(req.body);

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
