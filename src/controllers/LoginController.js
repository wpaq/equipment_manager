import User from '../models/User';

class LoginController {
    async index (req, res) {
        if (!req.session) {
            return res.render('login');  
        }     
        return res.render('login-logado');
    }


};

export default new LoginController();
