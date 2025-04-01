// routes/enrollmentRoutes.js
const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();
// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);
// Endpoints para gerenciamento de matrículas
router.post('/', enrollmentController.createEnrollment);
router.get('/', enrollmentController.getEnrollments);
router.get('/:id', enrollmentController.getEnrollment);
router.delete('/:id', enrollmentController.deleteEnrollment);

module.exports = router;
