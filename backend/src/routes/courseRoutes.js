// routes/courseRoutes.js
const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();
// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);
// Endpoints para gerenciamento de cursos
router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
