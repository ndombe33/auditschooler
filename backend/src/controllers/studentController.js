// controllers/studentController.js
const { Student, User } = require('../models');

exports.createStudent = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, userId } = req.body;
    const student = await Student.create({ firstName, lastName, dateOfBirth, gender, userId });
    return res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ error: 'Erro ao criar aluno' });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ include: [{ model: User, attributes: ['name', 'email'] }] });
    return res.json(students);
  } catch (error) {
    console.error("Error retrieving students:", error);
    return res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id, { include: [{ model: User, attributes: ['name', 'email'] }] });
    if (!student) return res.status(404).json({ error: 'Aluno não encontrado' });
    return res.json(student);
  } catch (error) {
    console.error("Error retrieving student:", error);
    return res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, dateOfBirth, gender } = req.body;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Aluno não encontrado' });
    await student.update({ firstName, lastName, dateOfBirth, gender });
    return res.json({ message: 'Aluno atualizado com sucesso', student });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Aluno não encontrado' });
    await student.destroy();
    return res.json({ message: 'Aluno deletado com sucesso' });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ error: 'Erro ao deletar aluno' });
  }
};
