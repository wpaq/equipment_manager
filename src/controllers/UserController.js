import User from '../models/User';

class UserController {
  // Show
  async show(req, res) {
      try {
        const users = await User.findAll();
        
        return res.json(users);
      } catch (e) {
        return res.status(400).json({
            errors: e.errors.map((err) => err.message),
        });
      }
  }

  // Store
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, nome, email } = newUser;
      return res.json({ id, nome, email });
    } catch (e) {
        return res.status(400).json({
            errors: e.errors.map((err) => err.message),
        });
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.body.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const newData = await user.update(req.body);
      const { id, name, email } = newData;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
