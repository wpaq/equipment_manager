import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const rawCookies = req.headers.cookie;
  
  // Verifica de existem cookies
  if (!rawCookies) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(function() {
        return res.status(401).redirect('login');
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
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(function() {
        return res.status(401).redirect('login');
    });
    return;
  }


  try {
    const dados = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    console.log(dados)

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
        req.flash('errors', 'Usuário inválido.');
        req.session.save(function() {
            return res.status(401).redirect('login');
        });
        return;
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    req.flash('errors', 'Token expirado ou inválido.');
    req.session.destroy();
    return res.status(401).redirect('login');
  }
};
