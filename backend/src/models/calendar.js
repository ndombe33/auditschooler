'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Defina as associações aqui, se necessário
    }
  }

  Calendar.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Calendar',
      tableName: 'calendars',  // Nome da tabela no banco de dados
      timestamps: true,  // Se você precisar de campos como createdAt, updatedAt
      underscored: true, // Utiliza nomes de campos em snake_case
    }
  );

  return Calendar;
};
