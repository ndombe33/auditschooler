// controllers/classController.js
const { Class } = require('../models');

exports.createClass = async (req, res) => {
  try {
    const { name } = req.body;
    const classInstance = await Class.create({ name });
    return res.status(201).json(classInstance);
  } catch (error) {
    console.error("Error creating class:", error);
    return res.status(500).json({ error: 'Erro ao criar turma' });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    return res.json(classes);
  } catch (error) {
    console.error("Error retrieving classes:", error);
    return res.status(500).json({ error: 'Erro ao buscar turmas' });
  }
};

exports.getClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classInstance = await Class.findByPk(id);
    if (!classInstance) return res.status(404).json({ error: 'Turma não encontrada' });
    return res.json(classInstance);
  } catch (error) {
    console.error("Error retrieving class:", error);
    return res.status(500).json({ error: 'Erro ao buscar turma' });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const classInstance = await Class.findByPk(id);
    if (!classInstance) return res.status(404).json({ error: 'Turma não encontrada' });
    await classInstance.update({ name });
    return res.json({ message: 'Turma atualizada com sucesso', classInstance });
  } catch (error) {
    console.error("Error updating class:", error);
    return res.status(500).json({ error: 'Erro ao atualizar turma' });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classInstance = await Class.findByPk(id);
    if (!classInstance) return res.status(404).json({ error: 'Turma não encontrada' });
    await classInstance.destroy();
    return res.json({ message: 'Turma deletada com sucesso' });
  } catch (error) {
    console.error("Error deleting class:", error);
    return res.status(500).json({ error: 'Erro ao deletar turma' });
  }
};
