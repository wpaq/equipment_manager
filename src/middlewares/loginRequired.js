import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const rawCookies = req.headers.cookie.split('; ');
  const parsedCookies = {};

  rawCookies.forEach(rawCookie => {
    const parsedCookie = rawCookie.split('=');

    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });

  const authorization = parsedCookies['access_token'];

  if (!authorization) {
    return res.status(404).json({
      errors: ['Login Required'],
    });
  }

  try {
    const dados = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(404).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
