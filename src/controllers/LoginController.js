import User from '../models/User';

class LoginController {
    async index (req, res) {
        if (req.session.user) {
            return res.render('login-logado');
        }

        res.render('login');
    }
    
    async login (req, res) {
        
    }
};

export default new LoginController();
