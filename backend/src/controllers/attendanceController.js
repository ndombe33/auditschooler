// controllers/attendanceController.js
const { Attendance } = require('../models');

exports.recordAttendance = async (req, res) => {
  try {
    const { studentId, courseId, status, date } = req.body;
    const attendance = await Attendance.create({ studentId, courseId, status, date: date || new Date() });
    return res.status(201).json(attendance);
  } catch (error) {
    console.error("Error recording attendance:", error);
    return res.status(500).json({ error: 'Erro ao registrar presença' });
  }
};

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendanceRecords = await Attendance.findAll({ where: { studentId } });
    return res.json(attendanceRecords);
  } catch (error) {
    console.error("Error retrieving attendance by student:", error);
    return res.status(500).json({ error: 'Erro ao buscar presenças' });
  }
};

exports.getAttendanceByClass = async (req, res) => {
  try {
    const { courseId } = req.params;
    const attendanceRecords = await Attendance.findAll({ where: { courseId } });
    return res.json(attendanceRecords);
  } catch (error) {
    console.error("Error retrieving attendance by class:", error);
    return res.status(500).json({ error: 'Erro ao buscar presenças' });
  }
};
