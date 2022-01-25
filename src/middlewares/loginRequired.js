import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  try {
    const authorization = req.session.token;
  
    if (!authorization) {
        req.flash('errors', 'Você precisa fazer login!');
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
