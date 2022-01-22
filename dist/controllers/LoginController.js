"use strict";Object.defineProperty(exports, "__esModule", {value: true});class LoginController {
    async index (req, res) {
        if (!req.session.token) {    
            return res.render('login');           
        }
        return res.render('login-logado');              
    }
};

exports. default = new LoginController();
