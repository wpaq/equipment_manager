class LoginController {
    async index (req, res) {
        if (!req.session.token) {    
            return res.render('login', { title:'Login' });           
        }
        return res.render('login-logado', { title:'Logado' });              
    }
};

export default new LoginController();
