import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  try {
    const rawCookies = req.headers.cookie;
  
    // Verifica de existem cookies
    if (!rawCookies) {
        if (req.session.user) {
            req.session.destroy();
        }

        req.flash('errors', 'Token expirado ou inválido.');
        req.session.save(function() {
            return res.status(401).redirect('/login');
        });
        return;
    }
    
    // Se exister separa eles e faz a leitura pra verificar se o authorization existe
    const rawCookiesSplit = rawCookies.split('; ');
    const parsedCookies = {};
  
    rawCookiesSplit.forEach(rawCookie => {
      const parsedCookie = rawCookie.split('=');
  
      parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
  
    const authorization = parsedCookies['access_token'];
  
    if (!authorization) {
        if (req.session.user) {
            req.session.destroy();
        }

        req.flash('errors', 'Token expirado ou inválido.');
        req.session.save(function() {
            return res.status(401).redirect('/login');
        });
        return;
    }

    const dados = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
        if (req.session.user) {
            req.session.destroy();
        }
        req.flash('errors', 'Usuário inválido.');
        req.session.save(function() {
            return res.status(401).redirect('/login');
        });
        return;
    }

    return next();
  } catch (e) {
    if (req.session) {
        req.session.destroy();
    }
    return res.status(401).redirect('/login');
  }
};
