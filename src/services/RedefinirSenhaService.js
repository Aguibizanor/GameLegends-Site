const RedefinirSenhaService = {
  enviarCodigoVerificacao: async (email) => {
    try {
      // Simula envio de código
      console.log(`Código enviado para: ${email}`);
      return { success: true, message: 'Código enviado com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao enviar código' };
    }
  },

  verificarCodigo: async (email, codigo) => {
    try {
      // Simula verificação (código sempre válido para demo)
      if (codigo === '123456') {
        return { success: true, message: 'Código válido!' };
      }
      return { success: false, message: 'Código inválido' };
    } catch (error) {
      return { success: false, message: 'Erro na verificação' };
    }
  },

  redefinirSenha: async (email, novaSenha) => {
    try {
      // Simula redefinição de senha
      console.log(`Senha redefinida para: ${email}`);
      return { success: true, message: 'Senha redefinida com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao redefinir senha' };
    }
  }
};

export default RedefinirSenhaService;