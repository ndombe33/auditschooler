// controllers/teacherController.js
const { Teacher, User } = require('../models');

exports.createTeacher = async (req, res) => {
  try {
    const { firstName, lastName, specialization, userId } = req.body;
    const teacher = await Teacher.create({ firstName, lastName, specialization, userId });
    return res.status(201).json(teacher);
  } catch (error) {
    console.error("Error creating teacher:", error);
    return res.status(500).json({ error: 'Erro ao criar professor' });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({ include: [{ model: User, attributes: ['name', 'email'] }] });
    return res.json(teachers);
  } catch (error) {
    console.error("Error retrieving teachers:", error);
    return res.status(500).json({ error: 'Erro ao buscar professores' });
  }
};

exports.getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id, { include: [{ model: User, attributes: ['name', 'email'] }] });
    if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });
    return res.json(teacher);
  } catch (error) {
    console.error("Error retrieving teacher:", error);
    return res.status(500).json({ error: 'Erro ao buscar professor' });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, specialization } = req.body;
    const teacher = await Teacher.findByPk(id);
    if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });
    await teacher.update({ firstName, lastName, specialization });
    return res.json({ message: 'Professor atualizado com sucesso', teacher });
  } catch (error) {
    console.error("Error updating teacher:", error);
    return res.status(500).json({ error: 'Erro ao atualizar professor' });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);
    if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });
    await teacher.destroy();
    return res.json({ message: 'Professor deletado com sucesso' });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return res.status(500).json({ error: 'Erro ao deletar professor' });
  }
};
