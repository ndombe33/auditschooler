// routes/permissionRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionController = require('../controllers/permissionController');
const courseController = require('../controllers/courseController');

const router = express.Router();
// Apenas usuários autenticados com role 'admin' podem criar cursos
router.post('/', authMiddleware, roleMiddleware('admin'), courseController.createCourse);

// Usuários autenticados podem visualizar os cursos
router.get('/', authMiddleware, courseController.getCourses);


// Endpoints para gerenciamento de permissões
router.post('/', permissionController.createPermission);
router.get('/', permissionController.getPermissions);
router.get('/:id', permissionController.getPermission);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
