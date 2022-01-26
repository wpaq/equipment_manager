"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _sequelize = require('sequelize');

class HomeController {
  async index(req, res) {
    try {
        const equipments = await _Equipment2.default.findAll();
        
        res.status(200).render('index', { equipments });      
    } catch (e) {
        return req.session.save(() => res.status(404).render('404'));
    }
  }

  async search(req, res) {
    try {
        const query = req.query.search;

        const equipments = await _Equipment2.default.findAll({ 
          where: { 
            [_sequelize.Op.or]: [   
              /* -- tombo is integer
              {
                tombo: { 
                  [Op.iLike]: `%${query}%`
                
              },*/   
              {
                equipamento: { 
                  [_sequelize.Op.iLike]: `%${query}%`
                } 
              },        
              { 
                responsavel: { 
                  [_sequelize.Op.iLike]: `%${query}%`
                } 
              },
              {
                local: { 
                  [_sequelize.Op.iLike]: `%${query}%`
                } 
              },
              { 
                empresa: { 
                  [_sequelize.Op.iLike]: `%${query}%`
                } 
              }
            ]            
          }
        });

        if (equipments.length === 0) {
          req.flash('errors', 'Equipamento não existe');
          req.session.save(() => res.redirect('/'));
          return;    
        }

        res.render('index', { equipments }); 
    } catch (err) {      
        return req.session.save(() => res.status(404).render('404'));   
    }
  }
}

exports. default = new HomeController();
