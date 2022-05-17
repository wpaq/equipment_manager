"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);

 class GetAllEquipments_Service {
    async execute(qtd_limit) {
        try {
            const { count, rows } = await _Equipment2.default.findAndCountAll({
                offset: 0,
                limit: qtd_limit,
                order: [
                    ['created_at', 'DESC']
                ]
            });

            return { count, rows };
        } catch (err) {
            return console.log(err)
        }
    }

} exports.GetAllEquipments_Service = GetAllEquipments_Service;