import Student from '../models/Student';

class StudentController {
  async index(req, answr) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
    });
    answr.json(students);
  }

  async store(req, answr) {
    try {
      const student = await Student.create(req.body);

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

      const student = await Student.findByPk(id);

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

      const student = await Student.findByPk(id);

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

      const student = await Student.findByPk(id);

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

export default new StudentController();
