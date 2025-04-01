// controllers/permissionController.js
const { Permission } = require('../models');

exports.createPermission = async (req, res) => {
  try {
    const { userId, accessLevel } = req.body;
    const permission = await Permission.create({ userId, accessLevel });
    return res.status(201).json(permission);
  } catch (error) {
    console.error("Error creating permission:", error);
    return res.status(500).json({ error: 'Erro ao criar permissão' });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    return res.json(permissions);
  } catch (error) {
    console.error("Error retrieving permissions:", error);
    return res.status(500).json({ error: 'Erro ao buscar permissões' });
  }
};

exports.getPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    if (!permission) return res.status(404).json({ error: 'Permissão não encontrada' });
    return res.json(permission);
  } catch (error) {
    console.error("Error retrieving permission:", error);
    return res.status(500).json({ error: 'Erro ao buscar permissão' });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { accessLevel } = req.body;
    const permission = await Permission.findByPk(id);
    if (!permission) return res.status(404).json({ error: 'Permissão não encontrada' });
    await permission.update({ accessLevel });
    return res.json({ message: 'Permissão atualizada com sucesso', permission });
  } catch (error) {
    console.error("Error updating permission:", error);
    return res.status(500).json({ error: 'Erro ao atualizar permissão' });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    if (!permission) return res.status(404).json({ error: 'Permissão não encontrada' });
    await permission.destroy();
    return res.json({ message: 'Permissão deletada com sucesso' });
  } catch (error) {
    console.error("Error deleting permission:", error);
    return res.status(500).json({ error: 'Erro ao deletar permissão' });
  }
};
