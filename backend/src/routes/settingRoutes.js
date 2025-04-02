// routes/settingRoutes.js
const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const settingController = require('../controllers/settingController');
const courseController = require('../controllers/courseController'); 

const router = express.Router();

// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);
// Endpoints para gerenciamento de configurações do sistema
router.post('/', settingController.createSetting);
router.get('/', settingController.getSettings);
router.get('/:id', settingController.getSetting);
router.put('/:id', settingController.updateSetting);
router.delete('/:id', settingController.deleteSetting);

module.exports = router;
