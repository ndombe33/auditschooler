'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamento com User (cada aluno está associado a um usuário)
      Student.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      
      // Relacionamento com Class (um aluno pode estar matriculado em várias turmas)
      Student.belongsToMany(models.Class, { through: models.Enrollment, foreignKey: 'studentId', as: 'classes' });
      
      // Relacionamento com Grade (um aluno pode ter várias notas)
      Student.hasMany(models.Grade, { foreignKey: 'studentId', as: 'grades' });
      
      // Relacionamento com Attendance (um aluno pode ter várias presenças registradas)
      Student.hasMany(models.Attendance, { foreignKey: 'studentId', as: 'attendances' });
      
      // Relacionamento com Payment (um aluno pode ter vários pagamentos)
      Student.hasMany(models.Payment, { foreignKey: 'studentId', as: 'payments' });
      
      // Relacionamento com Transaction (um aluno pode ter várias transações financeiras)
      Student.hasMany(models.Transaction, { foreignKey: 'studentId', as: 'transactions' });
      
      // Relacionamento com StudentMovement (um aluno pode ter várias movimentações)
      Student.hasMany(models.StudentMovement, { foreignKey: 'studentId', as: 'movements' });
    }
  }

  Student.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'students',
      timestamps: true,
      underscored: true,
    }
  );

  return Student;
};
