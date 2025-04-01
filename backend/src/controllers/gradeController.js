// controllers/gradeController.js
const { Grade } = require('../models');

exports.createGrade = async (req, res) => {
  try {
    const { studentId, courseId, score, comment } = req.body;
    const grade = await Grade.create({ studentId, courseId, score, comment });
    return res.status(201).json(grade);
  } catch (error) {
    console.error("Error creating grade:", error);
    return res.status(500).json({ error: 'Erro ao criar nota' });
  }
};

exports.getGradesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await Grade.findAll({ where: { studentId } });
    return res.json(grades);
  } catch (error) {
    console.error("Error retrieving grades:", error);
    return res.status(500).json({ error: 'Erro ao buscar notas' });
  }
};

exports.updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, comment } = req.body;
    const grade = await Grade.findByPk(id);
    if (!grade) return res.status(404).json({ error: 'Nota não encontrada' });
    await grade.update({ score, comment });
    return res.json({ message: 'Nota atualizada com sucesso', grade });
  } catch (error) {
    console.error("Error updating grade:", error);
    return res.status(500).json({ error: 'Erro ao atualizar nota' });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const grade = await Grade.findByPk(id);
    if (!grade) return res.status(404).json({ error: 'Nota não encontrada' });
    await grade.destroy();
    return res.json({ message: 'Nota deletada com sucesso' });
  } catch (error) {
    console.error("Error deleting grade:", error);
    return res.status(500).json({ error: 'Erro ao deletar nota' });
  }
};
