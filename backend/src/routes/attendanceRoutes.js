// routes/attendanceRoutes.js
const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);

// Endpoint para registrar presença
router.post('/', attendanceController.recordAttendance);

// Endpoints para obter presenças
router.get('/student/:studentId', attendanceController.getAttendanceByStudent);
router.get('/course/:courseId', attendanceController.getAttendanceByClass);

module.exports = router;
