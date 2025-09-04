
const RedefinirSenhaService = {
  isEmailReal: false,
 
  enviarCodigo: async (email) => {
    try {
      const response = await fetch('http://localhost:8080/redefinir-senha/enviar-codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
     
      if (response.ok) {
        // Verifica se é um email real baseado no domínio
        const domain = email.toLowerCase().substring(email.indexOf('@'));
        const realProviders = [
          '@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com',
          '@live.com', '@icloud.com', '@protonmail.com', '@uol.com.br',
          '@bol.com.br', '@terra.com.br'
        ];
        RedefinirSenhaService.isEmailReal = realProviders.includes(domain);
        return true;
      } else {
        throw new Error('Email não encontrado');
      }
    } catch (error) {
      throw new Error(error.message || 'Erro ao conectar com o servidor');
    }
  },
 
  enviarCodigoVerificacao: async (email) => {
    try {
      const response = await fetch('http://localhost:8080/redefinir-senha/enviar-codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
     
      if (response.ok) {
        return { success: true, message: 'Código enviado com sucesso!' };
      } else {
        const errorData = await response.text();
        return { success: false, message: errorData || 'Email não encontrado' };
      }
    } catch (error) {
      return { success: false, message: 'Erro ao conectar com o servidor' };
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