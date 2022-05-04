import Equipment from '../models/Equipment';
import { Op } from 'sequelize';
import fs from 'fs';

const random = () => Math.floor(Math.random() * 10000 + 10000);

class HomeController {
  async index(req, res) {
    try {
        const limiter = req.query.limit;
        const equipments = await Equipment.findAll({
          offset: 0,
          limit: limiter || 3,
          order: ['tombo']
        });

        //const fotos = await Equipment.findByPk('1ed8c38d-0b25-4d28-aa8e-fd3bc494e482');

        //const outputFilepath =  `./public/assets/img/${Date.now()}_${random()}.png`;
        //fs.writeFileSync(outputFilepath, fotos.foto, 'base64');
        

        res.status(200).render('index', { equipments });      
    } catch (e) {
        return req.session.save(() => res.status(404).render('404'));
    }
  }

  async search(req, res) {
    try {
        const query = req.query.search;

        const equipments = await Equipment.findAll({ 
          where: { 
            [Op.or]: [   
              /* -- tombo is integer
              {
                tombo: { 
                  [Op.iLike]: `%${query}%`
                
              },*/   
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
