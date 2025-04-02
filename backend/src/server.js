// Importação de Pacotes Principais
const express = require('express');
require('dotenv').config();
const cookieParser = require("cookie-parser");

// Importação de Segurança e Performance
const helmetConfig = require('./middlewares/helmetConfig');
const corsConfig = require('./middlewares/corsConfig');
const rateLimit = require('./middlewares/rateLimit');
const sanitizeInputs = require('./middlewares/sanitization');

// Importação de Logs
const { requestLogger } = require('./middlewares/logger');

// Importação de Middlewares Globais
const errorHandler = require('./middlewares/errorHandler');

// Importação de Rotas
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const classRoutes = require('./routes/classRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const settingRoutes = require('./routes/settingRoutes');

// Inicializa o App Express
const app = express();

// 🔹 1️⃣ Segurança Primeiro
app.use(helmetConfig);   // Proteção contra ataques
app.use(corsConfig);     // Configuração de CORS
app.use(rateLimit);      // Limite de requisições

// 🔹 2️⃣ Logging e Monitoramento
app.use(requestLogger);  // Captura logs das requisições

// 🔹 3️⃣ Configuração de Entrada
app.use(express.json());  // Permitir JSON no corpo das requisições
app.use(cookieParser());  // Permitir manipulação de cookies
app.use(sanitizeInputs);  // Sanitização contra XSS e SQL Injection

// 🔹 4️⃣ Rotas de Autenticação
app.use("/api/auth", authRoutes);

// 🔹 5️⃣ Rotas Principais
app.use('/courses', courseRoutes);
app.use('/users', userRoutes);
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/subjects', subjectRoutes);
app.use('/classes', classRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/grades', gradeRoutes);
app.use('/payments', paymentRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/permissions', permissionRoutes);
app.use('/settings', settingRoutes);

// 🔹 6️⃣ Rota Padrão
app.get('/', (_req, res) => res.send('API Rodando com Segurança 🚀'));

// 🔹 7️⃣ Middleware Global de Tratamento de Erros (Sempre no Final)
app.use(errorHandler);

// 🔹 8️⃣ Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
