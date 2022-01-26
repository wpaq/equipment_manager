import Equipment from '../models/Equipment';

class HomeController {
  async index(req, res) {
    try {
        const equipments = await Equipment.findAll();
        
        res.status(200).render('index', { equipments });      
    } catch (e) {
        return req.session.save(() => res.status(404).render('404'));
    }
  }

  async search(req, res) {
    try {
        const tombo = req.query.tombo;

        if (typeof tombo != 'number') {
            req.flash('errors', 'Informe um valor válido.');
            req.session.save(() => res.redirect(`/index`));
            return;    
        }

        const equipments = await Equipment.findAll({ where: { tombo } });

        res.render('index', { equipments }); 
    } catch (err) {      
        return req.session.save(() => res.status(404).render('404'));   
    }
  }
}

export default new HomeController();
