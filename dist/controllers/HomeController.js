"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);

class HomeController {
  async index(req, res) {
    try {
        const equipments = await _Equipment2.default.findAll();
        res.render('index', { equipments });      
    } catch (e) {
        return req.session.save(() => res.render('404'));
    }
  }

  async search(req, res) {
    try {
        const tombo = req.query.tombo;

        if (typeof tombo != 'number') {
            req.flash('errors', 'Informe um valor válido.');
            req.session.save(() => res.redirect(`/index`));
            return;    
        }

        const equipments = await _Equipment2.default.findAll({ where: { tombo } });

        res.render('index', { equipments }); 
    } catch (err) {      
        console.log(err)
        return req.session.save(() => res.render('404'));   
    }
  }
}

exports. default = new HomeController();
