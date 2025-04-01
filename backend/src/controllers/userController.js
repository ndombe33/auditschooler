// controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Em produção, configure essa variável de ambiente

// Regras de validação para o registro de usuário
exports.registerValidations = [
  body('name').notEmpty().withMessage('O nome é obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter pelo menos 6 caracteres')
];

// Função para registrar usuário com validação e tratamento de erros
exports.register = async (req, res, next) => {
  // Executa as validações
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Falha na validação dos dados');
    error.status = 400;
    error.details = errors.array();
    return next(error);
  }

  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error('Email já está em uso');
      error.status = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    return res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};


// Regras de validação para o login
exports.loginValidations = [
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória')
];

exports.login = async (req, res, next) => {
  // Executa as validações
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Falha na validação dos dados');
    error.status = 400;
    error.details = errors.array();
    return next(error);
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciais inválidas' });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    await user.update({ name, email, role });
    return res.json({ message: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    await user.destroy();
    return res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
