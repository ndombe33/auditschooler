'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automaticamente.
     */
    static associate(models) {
      // Defina associações aqui, se necessário
    }
  }

  Setting.init(
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false, // Garante que a chave seja obrigatória
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false, // Garante que o valor seja obrigatório
      },
    },
    {
      sequelize,
      modelName: 'Setting',
      tableName: 'settings', // Define o nome da tabela
      timestamps: false, // A tabela não terá campos de timestamps (createdAt, updatedAt)
      underscored: true, // Utiliza snake_case para os campos na tabela
    }
  );

  return Setting;
};
