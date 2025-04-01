// controllers/subjectController.js
const { Subject } = require('../models');

exports.createSubject = async (req, res) => {
  try {
    const { name, teacherId } = req.body;
    const subject = await Subject.create({ name, teacherId });
    return res.status(201).json(subject);
  } catch (error) {
    console.error("Error creating subject:", error);
    return res.status(500).json({ error: 'Erro ao criar disciplina' });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    return res.json(subjects);
  } catch (error) {
    console.error("Error retrieving subjects:", error);
    return res.status(500).json({ error: 'Erro ao buscar disciplinas' });
  }
};

exports.getSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    if (!subject) return res.status(404).json({ error: 'Disciplina não encontrada' });
    return res.json(subject);
  } catch (error) {
    console.error("Error retrieving subject:", error);
    return res.status(500).json({ error: 'Erro ao buscar disciplina' });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, teacherId } = req.body;
    const subject = await Subject.findByPk(id);
    if (!subject) return res.status(404).json({ error: 'Disciplina não encontrada' });
    await subject.update({ name, teacherId });
    return res.json({ message: 'Disciplina atualizada com sucesso', subject });
  } catch (error) {
    console.error("Error updating subject:", error);
    return res.status(500).json({ error: 'Erro ao atualizar disciplina' });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    if (!subject) return res.status(404).json({ error: 'Disciplina não encontrada' });
    await subject.destroy();
    return res.json({ message: 'Disciplina deletada com sucesso' });
  } catch (error) {
    console.error("Error deleting subject:", error);
    return res.status(500).json({ error: 'Erro ao deletar disciplina' });
  }
};
