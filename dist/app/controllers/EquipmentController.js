"use strict";const { Equipments } = require('../models');

class EquipmentController {
    async index(req, res) {
        res.json('equipment');
    }

    // Store
    async store(req, res) {
        try {
            const newEquipment = await Equipments.create(req.body);
            const { id, tombo, equipamento, setor, empresa, observacao } = newEquipment;
            return res.json({ id, tombo, equipamento, setor, empresa, observacao });
        } catch(e) {
            return res.status(400).json({
                errors: 'erro',
            });
        }
        
    }
}

module.exports = new EquipmentController();