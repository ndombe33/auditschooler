'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamento com Student (uma turma pode ter vários alunos)
      Class.hasMany(models.Student, { foreignKey: 'classId', as: 'students' });

      // Relacionamento com StudentMovement (uma turma pode ter alunos saindo e entrando)
      Class.hasMany(models.StudentMovement, { foreignKey: 'oldClassId', as: 'studentsLeaving' });
      Class.hasMany(models.StudentMovement, { foreignKey: 'newClassId', as: 'studentsEntering' });
      
      // Relacionamento com Enrollment (tabela de matrículas para relação muitos-para-muitos entre turmas e alunos)
      Class.belongsToMany(models.Student, { through: models.Enrollment, foreignKey: 'classId', as: 'enrollments' });
      
      // Relacionamento com Attendance (uma turma pode ter várias presenças registradas)
      Class.hasMany(models.Attendance, { foreignKey: 'classId', as: 'attendances' });
    }
  }

  Class.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Class',
      tableName: 'classes',
      timestamps: true,
      underscored: true,
    }
  );

  return Class;
};
