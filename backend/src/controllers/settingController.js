// controllers/settingController.js
const { Setting } = require('../models');

exports.createSetting = async (req, res) => {
  try {
    const { key, value } = req.body;
    const setting = await Setting.create({ key, value });
    return res.status(201).json(setting);
  } catch (error) {
    console.error("Error creating setting:", error);
    return res.status(500).json({ error: 'Erro ao criar configuração' });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    return res.json(settings);
  } catch (error) {
    console.error("Error retrieving settings:", error);
    return res.status(500).json({ error: 'Erro ao buscar configurações' });
  }
};

exports.getSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const setting = await Setting.findByPk(id);
    if (!setting) return res.status(404).json({ error: 'Configuração não encontrada' });
    return res.json(setting);
  } catch (error) {
    console.error("Error retrieving setting:", error);
    return res.status(500).json({ error: 'Erro ao buscar configuração' });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const setting = await Setting.findByPk(id);
    if (!setting) return res.status(404).json({ error: 'Configuração não encontrada' });
    await setting.update({ value });
    return res.json({ message: 'Configuração atualizada com sucesso', setting });
  } catch (error) {
    console.error("Error updating setting:", error);
    return res.status(500).json({ error: 'Erro ao atualizar configuração' });
  }
};

exports.deleteSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const setting = await Setting.findByPk(id);
    if (!setting) return res.status(404).json({ error: 'Configuração não encontrada' });
    await setting.destroy();
    return res.json({ message: 'Configuração deletada com sucesso' });
  } catch (error) {
    console.error("Error deleting setting:", error);
    return res.status(500).json({ error: 'Erro ao deletar configuração' });
  }
};
