"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _path = require('path');

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

exports. default = new LoginController();
