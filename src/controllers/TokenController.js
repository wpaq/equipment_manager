import User from '../models/User';
import jwt from 'jsonwebtoken';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
        req.flash('errors', 'Credenciais inválidas.');
        req.session.save(function() {
          return res.status(401).redirect('login');
        });
        return;
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash('errors', 'Credenciais inválidas.');
      req.session.save(function() {
        return res.status(401).redirect('login');
      });
      return;
    }

    if (!(await user.passwordIsValid(password))) {
        req.flash('errors', 'Credenciais inválidas.');
        req.session.save(function() {
          return res.status(401).redirect('login');
        });
        return;
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    req.session.token = token;
    
    req.flash('success', 'Usuário logado com sucesso');
    req.session.save(function() {
        return res.redirect('/');
    }); 
  }
}

export default new TokenController();
