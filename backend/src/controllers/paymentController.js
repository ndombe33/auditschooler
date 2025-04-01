// controllers/paymentController.js
const { Payment } = require('../models');

exports.createPayment = async (req, res) => {
  try {
    const { studentId, amount, status, date } = req.body;
    const payment = await Payment.create({ studentId, amount, status, date: date || new Date() });
    return res.status(201).json(payment);
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ error: 'Erro ao registrar pagamento' });
  }
};

exports.getPaymentsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const payments = await Payment.findAll({ where: { studentId } });
    return res.json(payments);
  } catch (error) {
    console.error("Error retrieving payments:", error);
    return res.status(500).json({ error: 'Erro ao buscar pagamentos' });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, status, date } = req.body;
    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
    await payment.update({ amount, status, date });
    return res.json({ message: 'Pagamento atualizado com sucesso', payment });
  } catch (error) {
    console.error("Error updating payment:", error);
    return res.status(500).json({ error: 'Erro ao atualizar pagamento' });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
    await payment.destroy();
    return res.json({ message: 'Pagamento deletado com sucesso' });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return res.status(500).json({ error: 'Erro ao deletar pagamento' });
  }
};
