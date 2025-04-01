const cors = require('cors');

const corsConfig = cors({
  origin: ['https://seu-front-end.com', 'http://localhost:3000'], // Domínios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permitir cookies e credenciais
});

module.exports = corsConfig;
