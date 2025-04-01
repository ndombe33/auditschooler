'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamento com Student (um pagamento pertence a um aluno)
      Payment.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
      
      // Relacionamento com Transaction (um pagamento pode ter várias transações associadas)
      Payment.hasMany(models.Transaction, { foreignKey: 'paymentId', as: 'transactions' });
    }
  }

  Payment.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
        onDelete: 'CASCADE', // Deleta os pagamentos associados ao aluno quando o aluno for removido
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments', // Nome da tabela no banco de dados
      timestamps: true,  // Se você precisar de campos como createdAt, updatedAt
      underscored: true, // Utiliza nomes de campos em snake_case
    }
  );

  return Payment;
};
