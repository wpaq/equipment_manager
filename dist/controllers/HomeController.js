"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _GetAllQRCodeImages_Service = require('../services/GetAllQRCodeImages_Service');
var _GetAllEquipments_Service = require('../services/GetAllEquipments_Service');

class HomeController {
  async index(req, res) {
    try {
        const qtd_limit = 5;

        const equipments = await new (0, _GetAllEquipments_Service.GetAllEquipments_Service)().execute(qtd_limit);
        await new (0, _GetAllQRCodeImages_Service.GetAllQRCodeImages_Service)().execute(qtd_limit);      

        return res.status(200).render('index', { 
            equipments: equipments.rows, 
            equipments_qtd: equipments.count, 
            title: 'Dashboard'
        });      
    } catch (err) {
        return req.session.save(() => res.status(404).render('404'));
    }
  }

}

exports. default = new HomeController();
