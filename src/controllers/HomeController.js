import Equipment from '../models/Equipment';

class HomeController {
  async index(req, res) {
    try {
        const equipments = await Equipment.findAll();

        res.render('index', { equipments });
       
    } catch (e) {
        return req.session.save(() => res.render('404'));
    }
  }
}

export default new HomeController();
