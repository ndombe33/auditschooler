// controllers/enrollmentController.js
const { Enrollment } = require('../models');

exports.createEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = await Enrollment.create({ studentId, courseId });
    return res.status(201).json(enrollment);
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return res.status(500).json({ error: 'Erro ao criar matrícula' });
  }
};

exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    return res.json(enrollments);
  } catch (error) {
    console.error("Error retrieving enrollments:", error);
    return res.status(500).json({ error: 'Erro ao buscar matrículas' });
  }
};

exports.getEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) return res.status(404).json({ error: 'Matrícula não encontrada' });
    return res.json(enrollment);
  } catch (error) {
    console.error("Error retrieving enrollment:", error);
    return res.status(500).json({ error: 'Erro ao buscar matrícula' });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) return res.status(404).json({ error: 'Matrícula não encontrada' });
    await enrollment.destroy();
    return res.json({ message: 'Matrícula deletada com sucesso' });
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    return res.status(500).json({ error: 'Erro ao deletar matrícula' });
  }
};
