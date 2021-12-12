class HomeController {
    async index(req, res) {
      res.render('index');
    }
  }
  
export default new HomeController();
  