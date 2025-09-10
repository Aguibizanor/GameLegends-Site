class DeveloperService {
  static baseUrl = "http://localhost:8080";

  // Verificar se o usuário é desenvolvedor
  static isDeveloper() {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      const tipoUsuario = usuarioData.usuario?.toLowerCase();
      return tipoUsuario === 'desenvolvedor' || tipoUsuario === 'developer';
    }
    return false;
  }

  // Verificar se o desenvolvedor pode excluir o projeto
  static canDeleteProject(projeto) {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (!usuarioData || !this.isDeveloper()) {
      return false;
    }
    
    return projeto?.emailDesenvolvedor === usuarioData.email;
  }

  // Excluir projeto
  static async deleteProject(projectId) {
    try {
      const response = await fetch(`${this.baseUrl}/projetos/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.status === 204 || response.status === 200;
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      return false;
    }
  }
}

export default DeveloperService;