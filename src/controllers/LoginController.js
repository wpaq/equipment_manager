class LoginController {
    async index (req, res) {
        if (req.cookies['access_token']) {
            return res.render('login-logado'); 
        }     
        return res.render('login');        
    }


};

export default new LoginController();
