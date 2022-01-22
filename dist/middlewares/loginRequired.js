"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  try {
    const authorization = req.session.token;
  
    if (!authorization) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(function() {
            return res.status(401).redirect('/login');
        });
        return;
    }

    const dados = _jsonwebtoken2.default.verify(authorization, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
        req.flash('errors', 'Usuário inválido.');
        req.session.save(function() {
            return res.status(401).redirect('/login');
        });
        return;
    }

    return next();
  } catch (e) {
    return res.status(401).redirect('/login');
  }
};
