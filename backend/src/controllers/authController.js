const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
require("dotenv").config();

// Gerar tokens
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15m", // Token de acesso expira em 15 minutos
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d", // Refresh token dura 7 dias
  });
};

// **1️⃣ Login**
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ error: "Senha incorreta" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Armazena o refresh token em um cookie seguro
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, secure: true, sameSite: "Strict",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

// **2️⃣ Refresh Token**
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "Token inválido" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token expirado" });

    const accessToken = generateAccessToken({ id: decoded.id });
    res.status(200).json({ accessToken });
  });
};

// **3️⃣ Logout**
exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout realizado com sucesso" });
};
