"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
        req.flash('errors', 'Credenciais inválidas.');
        req.session.save(function() {
          return res.status(401).render('login');
        });
        return;
    }

    const user = await _User2.default.findOne({ where: { email } });

    if (!user) {
      req.flash('errors', 'Credenciais inválidas.');
      req.session.save(function() {
        return res.status(401).render('login');
      });
      return;
    }

    if (!(await user.passwordIsValid(password))) {
        req.flash('errors', 'Credenciais inválidas.');
        req.session.save(function() {
          return res.status(401).render('login');
        });
        return;
    }

    const { id } = user;
    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    req.session.token = token;
    
    req.flash('success', 'Usuário logado com sucesso');
    req.session.save(function() {
        return res.redirect('/');
    }); 
  }
}

exports. default = new TokenController();
