class LoginController {
    async index (req, res) {
        if (!req.session.token) {    
            return res.render('login');           
        }
        return res.render('login-logado');              
    }
};

export default new LoginController();
