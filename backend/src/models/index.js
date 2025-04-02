'use strict';

require("dotenv").config({ path: "./.env" });
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// ✅ Confirma se o arquivo de configuração está correto
if (!config) {
  console.error("❌ Configuração do banco de dados não encontrada!");
  process.exit(1);
}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// ✅ Verifica a conexão com o banco antes de carregar os modelos
sequelize.authenticate()
  .then(() => console.log("✅ Conexão com o banco de dados estabelecida com sucesso!"))
  .catch(err => {
    console.error("❌ Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  });

// ✅ Carregamento dos modelos com tratamento de erro
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    console.log(`🔍 Carregando modelo: ${file}`);

    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

      if (!model || !model.name) {
        console.error(`❌ Modelo inválido ou sem nome: ${file}`);
      } else {
        console.log(`✅ Modelo carregado: ${model.name}`);
        db[model.name] = model;
      }
    } catch (err) {
      console.error(`❌ Erro ao carregar modelo '${file}':`, err);
    }
  });

// ✅ Associação dos modelos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
