import Equipment from '../models/Equipment';
import { Op } from 'sequelize';

class HomeController {
  async index(req, res) {
    try {
        // content per page | limiter
        const limiter = req.query.limit;

        // SELECT * FROM equipments ORDER BY tombo
        const { count, rows } = await Equipment.findAndCountAll({
          offset: 0,
          limit: limiter || 100,
          order: ['tombo']
        })

        res.status(200).render('index', { equipments: rows });      
    } catch (e) {
        return req.session.save(() => res.status(404).render('404'));
    }
  }

  async search(req, res) {
    try {
        const query = req.query.search;

        // SELECT * FROM equipments WHERE 
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
          req.flash('errors', 'Equipamento não encontrado');
          req.session.save(() => res.redirect('/'));
          return;    
        }

        res.status(200).render('index', { equipments }); 
    } catch (err) {      
        return req.session.save(() => res.status(404).render('404'));   
    }
  }
}

export default new HomeController();
