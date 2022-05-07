"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Equipment = require('../models/Equipment'); var _Equipment2 = _interopRequireDefault(_Equipment);
var _QRCodeImage = require('../models/QRCodeImage'); var _QRCodeImage2 = _interopRequireDefault(_QRCodeImage);
var _sequelize = require('sequelize');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

class HomeController {
  async index(req, res) {
    try {
        const limiter = req.query.limit;
        const { count, rows } = await _Equipment2.default.findAndCountAll({
          offset: 0,
          limit: limiter || 500,
          order: ['tombo']
        });

        const QRCodeImages = await _QRCodeImage2.default.findAll();

        QRCodeImages.forEach(images => {
          // caminho onde salva as imagens
          const outputFilepath =  `./public/assets/img/${images.equipment_id}.png`;

          // verificar se imagem ja existe
          _fs2.default.access(outputFilepath, _fs2.default.constants.F_OK, (err) => {           
            if (err) {       
              // verifica se existe imagem cadastrada no database    
              if (images.photo_data) {
                // converte o arquivo blob do database para imagem e salva no server local
                _fs2.default.writeFileSync(outputFilepath, images.photo_data, 'base64');
                
              }
            }
          });
        })       

        res.status(200).render('index', { equipments: rows, equipments_qtd: count , title: 'Dashboard'});      
    } catch (e) {
        console.log(e)
        return req.session.save(() => res.status(404).render('404'));
    }
  }

  async search(req, res) {
    try {
        const query = req.query.search;

        const equipments = await _Equipment2.default.findAll({ 
          where: { 
            [_sequelize.Op.or]: [   
              {
                tombo: { 
                  [_sequelize.Op.iLike]: `%${query}%`   
                }             
              },  
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
