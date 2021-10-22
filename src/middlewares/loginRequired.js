import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, answr, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return answr.status(401).json({
      errors: ['Login requerido.'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return answr.status(401).json({
        errors: ['Usuário inválido.'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return answr.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
