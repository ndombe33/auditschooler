// routes/gradeRoutes.js
const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const gradeController = require('../controllers/gradeController');
const courseController = require('../controllers/courseController');

const router = express.Router();
// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);

// Endpoints para gerenciamento de notas
router.post('/', gradeController.createGrade);
router.get('/student/:studentId', gradeController.getGradesByStudent);
router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;
