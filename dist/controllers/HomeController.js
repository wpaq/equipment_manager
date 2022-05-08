"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _GetAllQRCodeImages_Service = require('../services/GetAllQRCodeImages_Service');
var _sequelize = require('sequelize');

class HomeController {
  async index(req, res) {
    try {
        const qtd_limit = 3
        const { count, rows } = await _Equipment2.default.findAndCountAll({
          offset: 0,
          limit: qtd_limit || 3,
          order: ['tombo']
        });

        await new (0, _GetAllQRCodeImages_Service.GetAllQRCodeImages_Service)().execute(qtd_limit);      

        res.status(200).render('index', { equipments: rows, equipments_qtd: count , title: 'Dashboard'});      
    } catch (e) {
        console.log(e)
        return req.session.save(() => res.status(404).render('404'));
    }
  }

}

exports. default = new HomeController();
