import Equipment from '../models/Equipment';
import QRCodeImage from '../models/QRCodeImage';
import { Op } from 'sequelize';
import fs from 'fs';


class HomeController {
  async index(req, res) {
    try {
        const limiter = req.query.limit;
        const { count, rows } = await Equipment.findAndCountAll({
          offset: 0,
          limit: limiter || 500,
          order: ['tombo']
        });

        const QRCodeImages = await QRCodeImage.findAll();

        QRCodeImages.forEach(images => {
          // caminho onde salva as imagens
          const outputFilepath =  `./public/assets/img/${images.equipment_id}.png`;

          // verificar se imagem ja existe
          fs.access(outputFilepath, fs.constants.F_OK, (err) => {           
            if (err) {       
              // verifica se existe imagem cadastrada no database    
              if (images.photo_data) {
                // converte o arquivo blob do database para imagem e salva no server local
                fs.writeFileSync(outputFilepath, images.photo_data, 'base64');
                
              }
            }
          });
        })       

        res.status(200).render('index', { equipments: rows, equipments_qtd: count });      
    } catch (e) {
        console.log(e)
        return req.session.save(() => res.status(404).render('404'));
    }
  }

  async search(req, res) {
    try {
        const query = req.query.search;

        const equipments = await Equipment.findAll({ 
          where: { 
            [Op.or]: [   
              {
                tombo: { 
                  [Op.iLike]: `%${query}%`   
                }             
              },  
              {
                equipamento: { 
                  [Op.iLike]: `%${query}%`
                } 
              },        
              { 
                responsavel: { 
                  [Op.iLike]: `%${query}%`
                } 
              },
              {
                local: { 
                  [Op.iLike]: `%${query}%`
                } 
              },
              { 
                empresa: { 
                  [Op.iLike]: `%${query}%`
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

export default new HomeController();
