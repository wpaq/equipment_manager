import { GetAllQRCodeImages_Service } from '../services/GetAllQRCodeImages_Service';
import { GetAllEquipments_Service } from '../services/GetAllEquipments_Service';

class HomeController {
  async index(req, res) {
    try {
        const qtd_limit = 5;

        const equipments = await new GetAllEquipments_Service().execute(qtd_limit);
        await new GetAllQRCodeImages_Service().execute(qtd_limit);      

        return res.status(200).render('index', { 
            equipments: equipments.rows, 
            equipments_qtd: equipments.count, 
            title: 'Dashboard'
        });      
    } catch (err) {
        return req.session.save(() => res.status(404).render('404'));
    }
  }

}

export default new HomeController();
