import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, answr) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return answr.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return answr.status(401).json({
        errors: ['Usuário não existe.'],
      });
    }

    if (!(await user.passwordValidation(password))) {
      return answr.status(401).json({
        errors: ['Senha inválida.'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return answr.json({ token });
  }
}

export default new TokenController();
