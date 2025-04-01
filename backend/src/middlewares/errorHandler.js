module.exports = (err, req, res, next) => {
    console.error('Erro capturado pelo middleware:', err);
  
    // Define o status do erro (500 se não for especificado)
    const statusCode = err.status || 500;
    
    // Define mensagens padrões para cada tipo de erro
    const errorMessages = {
      400: 'Requisição inválida. Verifique os dados enviados.',
      401: 'Não autorizado. Faça login para continuar.',
      403: 'Acesso proibido. Você não tem permissão.',
      404: 'Recurso não encontrado.',
      408: 'Tempo de requisição esgotado.',
      409: 'Conflito de dados. O recurso já existe.',
      422: 'Erro de validação. Dados inválidos fornecidos.',
      500: 'Erro interno do servidor. Tente novamente mais tarde.',
      502: 'Erro no servidor intermediário (Bad Gateway).',
      503: 'Serviço temporariamente indisponível. Tente novamente mais tarde.',
      504: 'Tempo limite do servidor excedido (Gateway Timeout).'
    };
  
    // Define a mensagem de erro amigável baseada no código de status
    const message = errorMessages[statusCode] || 'Erro desconhecido. Tente novamente.';
  
    // Estrutura padronizada da resposta de erro
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      message: err.message || message,
      details: err.details || null // Para capturar erros detalhados (como validação)
    });
  };
  