const helmet = require('helmet');

const helmetConfig = helmet({
  contentSecurityPolicy: false, // Desativado caso use CDN ou inline scripts
  crossOriginEmbedderPolicy: false,
});

module.exports = helmetConfig;
