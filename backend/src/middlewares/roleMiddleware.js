// middlewares/roleMiddleware.js

/**
 * Middleware para verificar se o usuário possui a role necessária para acessar o recurso.
 * Pode ser usado passando uma string ou um array de roles permitidas.
 * Exemplo: roleMiddleware('admin') ou roleMiddleware(['admin', 'teacher'])
 */
const roleMiddleware = (allowedRoles) => {
    // Se allowedRoles não for um array, converte para array
    if (!Array.isArray(allowedRoles)) {
      allowedRoles = [allowedRoles];
    }
  
    return (req, res, next) => {
      // Verifica se o middleware de autenticação já atribuiu req.user
      if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }
  
      // Checa se a role do usuário está entre as permitidas
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  