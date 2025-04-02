// routes/teacherRoutes.js
const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const teacherController = require('../controllers/teacherController');
const courseController = require('../controllers/courseController'); 

const router = express.Router();
// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);
// Endpoints para gerenciamento de professores
router.post('/', teacherController.createTeacher);
router.get('/', teacherController.getTeachers);
router.get('/:id', teacherController.getTeacher);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
