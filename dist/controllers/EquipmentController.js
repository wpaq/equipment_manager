"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);

class EquipmentController {
    async show(req, res) {
        try {
            const equipment = await _Equipment2.default.findAll();

            return res.json(equipment);
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async store(req, res) {
        try {
            const newEquipment = await _Equipment2.default.create(req.body);

            return res.json(newEquipment);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    };

    async update(req, res) {
        try {
            const equipment = await _Equipment2.default.findByPk(req.body.id);

            if (!equipment) {
                return res.status(400).json({
                    errors: 'Equipment does not exists'
                });
            };

            const newData = await equipment.update(req.body);
            return res.json(equipment);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    };

    async delete(req, res) {
        try {
            const equipment = await _Equipment2.default.findByPk(req.body.id);

            if (!equipment) {
                return res.status(400).json({
                    errors: 'Equipment does not exists'
                });
            }

            await equipment.destroy();
            return res.json(null);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    };
};

exports. default = new EquipmentController();
