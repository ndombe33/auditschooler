'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StudentMovement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamento com Student (cada movimentação pertence a um aluno)
      StudentMovement.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });

      // Relacionamento com Class (turma anterior do aluno)
      StudentMovement.belongsTo(models.Class, { foreignKey: 'oldClassId', as: 'oldClass' });

      // Relacionamento com Class (nova turma do aluno)
      StudentMovement.belongsTo(models.Class, { foreignKey: 'newClassId', as: 'newClass' });
    }
  }

  StudentMovement.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    oldClassId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Classes',
        key: 'id'
      }
    },
    newClassId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Classes',
        key: 'id'
      }
    },
    movementType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StudentMovement',
  });

  return StudentMovement;
};
