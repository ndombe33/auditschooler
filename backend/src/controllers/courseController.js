// controllers/courseController.js
const { Course } = require('../models');

exports.createCourse = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;
    const course = await Course.create({ name, description, duration, price });
    return res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ error: 'Erro ao criar curso' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res.json(courses);
  } catch (error) {
    console.error("Error retrieving courses:", error);
    return res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
    return res.json(course);
  } catch (error) {
    console.error("Error retrieving course:", error);
    return res.status(500).json({ error: 'Erro ao buscar curso' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration, price } = req.body;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
    await course.update({ name, description, duration, price });
    return res.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ error: 'Erro ao atualizar curso' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
    await course.destroy();
    return res.json({ message: 'Curso deletado com sucesso' });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ error: 'Erro ao deletar curso' });
  }
};
