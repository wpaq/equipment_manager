import Equipment from '../models/Equipment';
import { GetAllQRCodeImages_Service } from '../services/GetAllQRCodeImages_Service';
import { Op } from 'sequelize';

class HomeController {
  async index(req, res) {
    try {
        const qtd_limit = 3
        const { count, rows } = await Equipment.findAndCountAll({
          offset: 0,
          limit: qtd_limit || 3,
          order: ['tombo']
        });

        await new GetAllQRCodeImages_Service().execute(qtd_limit);      

        res.status(200).render('index', { equipments: rows, equipments_qtd: count , title: 'Dashboard'});      
    } catch (e) {
        console.log(e)
        return req.session.save(() => res.status(404).render('404'));
    }
  }

}

export default new HomeController();
