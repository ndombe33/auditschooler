const express = require('express');
const { createCourse, getCourses } = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();
// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);
router.post('/', createCourse);
router.get('/', getCourses);

module.exports = router;
