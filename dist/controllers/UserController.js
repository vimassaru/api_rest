"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, answr) {
    try {
      const newUser = await _User2.default.create(req.body);
      const { id, name, email } = newUser;
      return answr.json({ id, name, email });
    } catch (e) {
      return answr.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index

  async index(req, answr) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'name', 'email'] });
      return answr.json(users);
    } catch (e) {
      return answr.json(null);
    }
  }

  // Show
  async show(req, answr) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      const { id, name, email } = user;

      return answr.json({ id, name, email });
    } catch (e) {
      return answr.json(null);
    }
  }

  // Update
  async update(req, answr) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return answr.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      const newData = await user.update(req.body);
      const { id, name, email } = newData;
      return answr.json({ id, name, email });
    } catch (e) {
      return answr.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, answr) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return answr.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await user.destroy();
      return answr.json(null);
    } catch (e) {
      return answr.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController();
