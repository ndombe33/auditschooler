module.exports = {
    testEnvironment: "node",                   // Ambiente de teste para Node.js
    collectCoverage: true,                     // Habilita a coleta de cobertura de código
    coverageDirectory: "coverage",             // Diretório onde os relatórios de cobertura serão armazenados
    testMatch: ["**/__tests__/**/*.test.js"],  // Define o padrão para os testes
    moduleDirectories: ["node_modules", "src"], // Adiciona o diretório 'src' para resolução de módulos
    moduleNameMapper: {
      // Adicione mapeamentos de aliases se for o caso, por exemplo:
      // "^@models/(.*)$": "<rootDir>/src/models/$1"
    },
  };
  