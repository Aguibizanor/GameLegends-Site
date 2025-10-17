const API_BASE_URL = "http://localhost:8080";
//const API_BASE_URL = "https://gamelegendsbackend-master-main-main-main.onrender.com";


class ApiService {
  // Configuração padrão para requisições
  static getDefaultHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  // Método auxiliar para tratar erros
  static handleError(error, context = '') {
    console.error(`Erro ${context}:`, error);
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 401:
          return "Email ou senha incorretos.";
        case 404:
          return "Usuário não encontrado.";
        default:
          return data || 'Erro no servidor';
      }
    } else if (error.request) {
      return "Servidor não responde. Verifique se o backend está rodando.";
    } else {
      return "Erro de conexão com o servidor.";
    }
  }

  // AUTH ENDPOINTS
  static async login(email, senha) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: this.getDefaultHeaders(),
        body: JSON.stringify({ email, senha })
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(await response.text() || 'Erro no login');
      }
    } catch (error) {
      throw new Error(this.handleError(error, 'no login'));
    }
  }

  static async cadastro(dadosCadastro) {
    try {
      const response = await fetch(`${API_BASE_URL}/cadastro`, {
        method: 'POST',
        headers: this.getDefaultHeaders(),
        body: JSON.stringify(dadosCadastro)
      });

      if (response.status === 201) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no cadastro');
      }
    } catch (error) {
      throw new Error(this.handleError(error, 'no cadastro'));
    }
  }

  // USER PROFILE ENDPOINTS
  static async deletarPerfil(idUsuario) {
    try {
      const response = await fetch(`${API_BASE_URL}/cadastro/${idUsuario}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar o perfil');
      }
      
      return true;
    } catch (error) {
      throw new Error(this.handleError(error, 'ao deletar perfil'));
    }
  }

  static async atualizarPerfil(dadosUsuario) {
    try {
      const response = await fetch(`${API_BASE_URL}/cadastro`, {
        method: 'POST',
        headers: this.getDefaultHeaders(),
        body: JSON.stringify(dadosUsuario)
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Erro ao atualizar perfil');
      }
    } catch (error) {
      throw new Error(this.handleError(error, 'ao atualizar perfil'));
    }
  }

  // PASSWORD RESET ENDPOINTS
  static async enviarCodigoRedefinicao(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/redefinir-senha/enviar-codigo`, {
        method: 'POST',
        headers: this.getDefaultHeaders(),
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
  }

  static async verificarCodigo(email, codigo) {
    try {
      // Simulação - ajustar conforme API real
      if (codigo === '123456') {
        return { success: true, message: 'Código válido!' };
      }
      return { success: false, message: 'Código inválido' };
    } catch (error) {
      return { success: false, message: 'Erro na verificação' };
    }
  }

  static async redefinirSenha(email, novaSenha) {
    try {
      // Simulação - ajustar conforme API real
      console.log(`Senha redefinida para: ${email}`);
      return { success: true, message: 'Senha redefinida com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao redefinir senha' };
    }
  }

  // PROJECT ENDPOINTS
  static async criarProjeto(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos/createComFoto`, {
        method: 'POST',
        body: formData // FormData já tem o Content-Type correto
      });

      if (response.status === 200 || response.status === 201) {
        return await response.json();
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}`);
      }
    } catch (error) {
      throw new Error(this.handleError(error, 'ao criar projeto'));
    }
  }

  static async deletarProjeto(projectId) {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos/${projectId}`, {
        method: 'DELETE',
        headers: this.getDefaultHeaders()
      });
      
      return response.status === 204 || response.status === 200;
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      return false;
    }
  }

  // DATA ENDPOINTS
  static async carregarCarrossel() {
    try {
      const response = await fetch('/Carrossel.json');
      
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Erro ao carregar dados do carrossel');
      }
    } catch (error) {
      throw new Error(this.handleError(error, 'ao carregar carrossel'));
    }
  }

  // PROJECT DATA ENDPOINTS
  static async buscarProjetos() {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Erro ao buscar projetos');
      }
    } catch (error) {
      throw new Error(this.handleError(error, 'ao buscar projetos'));
    }
  }

  static async buscarProjetoPorId(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos/${id}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Projeto não encontrado');
      }
    } catch (error) {
      throw new Error(this.handleError(error, 'ao buscar projeto'));
    }
  }

  static getFotoProjetoUrl(id) {
    return `${API_BASE_URL}/projetos/${id}/foto`;
  }

  // UTILITY METHODS
  static isEmailReal(email) {
    if (!email.includes('@')) return false;
    
    const domain = email.toLowerCase().substring(email.indexOf('@'));
    const realProviders = [
      '@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com',
      '@live.com', '@icloud.com', '@protonmail.com', '@uol.com.br',
      '@bol.com.br', '@terra.com.br'
    ];
    
    return realProviders.includes(domain);
  }
}

export default ApiService;
export { API_BASE_URL };