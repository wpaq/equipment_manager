import { resolve } from 'path';

class LoginController {
    async index (req, res) {
        if (!req.session.token) {   
            return res.status(401).render('login');           
        }
        return res.status(200).render('login-logado');              
    }

    async logout (req, res) {
        try {
            req.session.destroy();
            return res.status(200).redirect('/login');
        } catch (err) {
            return res.status(400).render('404');
        }
    }
};

export default new LoginController();
