"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _sequelize = require('sequelize');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

const random = () => Math.floor(Math.random() * 10000 + 10000);

class HomeController {
  async index(req, res) {
    try {
        const limiter = req.query.limit;
        const equipments = await _Equipment2.default.findAll({
          offset: 0,
          limit: limiter || 3,
          order: ['tombo']
        });


        equipments.forEach(equipment => {
          // caminho onde salva as imagens
          const outputFilepath =  `./public/assets/img/${equipment.id}.png`;

          // verificar se imagem ja existe
          _fs2.default.access(outputFilepath, _fs2.default.constants.F_OK, (err) => {           
            if (err) {       
              // verifica se existe imagem cadastrada no database    
              if (equipment.foto != null) {
                // converte o arquivo blob do database para imagem e salva no server local
                _fs2.default.writeFileSync(outputFilepath, equipment.foto, 'base64');
              }
            }
          });
        })       

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
