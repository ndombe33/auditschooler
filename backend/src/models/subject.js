'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subject.belongsTo(models.Teacher, { foreignKey: 'teacherId', as: 'teacher' });
      Subject.hasMany(models.Grade, { foreignKey: 'subjectId', as: 'grades' });
    }
  }

  Subject.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teachers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Subject',
      tableName: 'subjects',
      timestamps: true,
      underscored: true,
    }
  );

  return Subject;
};
