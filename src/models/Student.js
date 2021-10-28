import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres',
          },

        },
      },
      surname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe.',
        },
        isEmail: {
          msg: 'E-mail inválido.',
        },
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        isInt: {
          msg: 'Idade precisa ser um número inteiro.',
        },
      },
      weight: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        isFloat: {
          msg: 'Peso precisa ser um número inteiro ou decimal.',
        },
      },
      height: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        isFloat: {
          msg: 'Altura precisa ser número inteiro ou decimal.',
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
}
