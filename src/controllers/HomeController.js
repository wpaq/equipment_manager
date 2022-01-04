import Equipment from '../models/Equipment';

class HomeController {
  async index(req, res) {
    const equipments = await Equipment.findAll();

    return res.render('index', { equipments });
  }
}

export default new HomeController();
