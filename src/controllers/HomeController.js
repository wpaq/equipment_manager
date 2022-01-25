import Equipment from '../models/Equipment';

class HomeController {
  async index(req, res) {
    try {
        const equipments = await Equipment.findAll();
        res.render('index', { equipments, title:'Home' });      
    } catch (e) {
        return req.session.save(() => res.render('404', { title:'404' }));
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

        res.render('index', { equipments, title: 'Home' }); 
    } catch (err) {      
        return req.session.save(() => res.render('404', { title:'404' }));   
    }
  }
}

export default new HomeController();
