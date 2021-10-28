"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, answr) {
    const students = await _Student2.default.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename'],
      },
    });
    answr.json(students);
  }

  async store(req, answr) {
    try {
      const student = await _Student2.default.create(req.body);

      return answr.json(student);
    } catch (e) {
      return answr.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, answr) {
    try {
      const { id } = req.params;

      if (!id) {
        return answr.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const student = await _Student2.default.findByPk(id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return answr.status(400).json({
          errors: ['Student does not exist.'],
        });
      }

      return answr.json(student);
    } catch (e) {
      return answr.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, answr) {
    try {
      const { id } = req.params;

      if (!id) {
        return answr.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return answr.status(400).json({
          errors: ['Student does not exist.'],
        });
      }

      await student.destroy();
      return answr.json({
        removed: true,
      });
    } catch (e) {
      return answr.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, answr) {
    try {
      const { id } = req.params;

      if (!id) {
        return answr.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return answr.status(400).json({
          errors: ['Student does not exist.'],
        });
      }

      const updatedStudent = await student.update(req.body);
      return answr.json(updatedStudent);
    } catch (e) {
      return answr.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new StudentController();
