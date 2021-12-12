import Login from '../models/Login';

class LoginController {
    async index(req, res) {
        res.render('login');
    }

    //Store
    async store(req, res) {
        try {
            const newLogin = await Login.create(req.body);
            const { id, email, password } = newLogin;
            return res.redirect('index');
        } catch(e) {
            return res.status(400).json({
                errors: 'erro',
            });
        }
        
    }
}

export default new LoginController();
