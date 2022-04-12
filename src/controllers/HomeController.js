import Equipment from '../models/Equipment';
import { Op, where } from 'sequelize';
import moment from 'moment';

class HomeController {
  async index(req, res) {
    try {
        const option = {
          year: 'numeric',
          month: ('long' || 'short' || 'numeric'),
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }
        const equipments = await Equipment.findAll();
        const date = equipments[0].updated_at;
        const datePtbr = date.toLocaleDateString('pt-br', option)
        const formated = moment(date).format('MMMM Do YYYY, h:mm:ss a');
        console.log(formated);
        console.log(datePtbr)
        
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
