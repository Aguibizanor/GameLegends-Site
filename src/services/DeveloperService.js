import ApiService from './ApiService';

class DeveloperService {
  // Verificar se o usuário é desenvolvedor
  static isDeveloper() {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      const tipoUsuario = usuarioData.tipoUsuario?.toLowerCase();
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
    
    return projeto?.idUsuario === usuarioData.id;
  }

  // Excluir projeto
  static async deleteProject(projectId) {
    return await ApiService.deletarProjeto(projectId);
  }
}

export default DeveloperService;