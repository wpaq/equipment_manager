"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Login = require('../models/Login'); var _Login2 = _interopRequireDefault(_Login);

class LoginController {
    async index(req, res) {
        res.render('login');
    }

    //Store
    async store(req, res) {
        try {
            const newLogin = await _Login2.default.create(req.body);
            const { id, email, password } = newLogin;
            return res.redirect('index');
        } catch(e) {
            return res.status(400).json({
                errors: 'erro',
            });
        }
        
    }
}

exports. default = new LoginController();
