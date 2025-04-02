// routes/classRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const classController = require('../controllers/classController');
const courseController = require('../controllers/courseController'); // Ajuste o caminho conforme necessário

const router = express.Router();

// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);

// Endpoints para gerenciamento de turmas
router.post('/', classController.createClass);
router.get('/', classController.getClasses);
router.get('/:id', classController.getClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
