import Equipment from '../models/Equipment';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';

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


        equipments.forEach(equipment => {
          fs.access(path, fs.constants.F_OK, (err) => {
            console.log(err ? 'não existe' : 'existe');
            
            if (!err) {
              const outputFilepath =  `./public/assets/img/${equipment.id}.png`;

              if (equipment.foto != null) {
                fs.writeFileSync(outputFilepath, equipment.foto, 'base64');
              }
            }
          });
        })
        //const fotos = await Equipment.findByPk('1ed8c38d-0b25-4d28-aa8e-fd3bc494e482');        

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
