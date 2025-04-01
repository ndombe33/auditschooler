const { body, param, query, validationResult } = require('express-validator');
const xss = require('xss-clean');

const sanitizeInputs = [
  xss(), // Remover scripts maliciosos
  body('email').isEmail().normalizeEmail().withMessage('E-mail inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = sanitizeInputs;
