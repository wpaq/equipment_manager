import User from '../models/User';

class LoginController {
    async index (req, res) {
        return res.render('login');
    }
    
    async login (req, res) {
        
    }
};

export default new LoginController();
