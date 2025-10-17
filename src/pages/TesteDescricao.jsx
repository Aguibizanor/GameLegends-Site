import React, { useState, useEffect } from 'react';
import './PaginaDescricao.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import esquerda from "../assets/esquerda.png";
import DeveloperService from '../services/DeveloperService';
import { loginDesenvolvedor, loginCliente, logout } from '../testData';

const TesteDescricao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    usuario: ""
  });

  // Projeto de teste simulado
  const projeto = {
    id: id,
    nomeProjeto: "Jogo Teste Desenvolvedor",
    descricao: "Este é um jogo de teste criado por um desenvolvedor para testar a funcionalidade de exclusão. Apenas o desenvolvedor que criou este projeto pode excluí-lo.",
    genero: "Aventura",
    tecnologias: "Unity, C#, JavaScript",
    dataInicio: "2024-01-15",
    statusProjeto: "Em Desenvolvimento",
    emailDesenvolvedor: "dev@teste.com"
  };

  useEffect(() => {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setFormData({
        email: usuarioData.email,
        usuario: usuarioData.usuario
      });
    }
  }, []);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const abrirModalExclusao = () => setModalExclusaoAberto(true);
  const fecharModalExclusao = () => setModalExclusaoAberto(false);
  
  const excluirProjeto = async () => {
    const sucesso = await DeveloperService.deleteProject(projeto.id);
    
    if (sucesso) {
      alert('Projeto excluído com sucesso!');
      navigate('/');
    } else {
      alert('Erro ao excluir projeto. Tente novamente.');
    }
    
    fecharModalExclusao();
  };
  
  const podeExcluir = () => {
    return DeveloperService.canDeleteProject(projeto);
  };

  return (
    <div className="GIT gradient-bg">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </head>
      <div className="app7">
        <header className="cabecalho">
          <div className="conteudo-cabecalho">
            <h1 className="logo">
              <a href="/Index" title="Game Legends">
                <img src={Logo} alt="Logo do Game Legends" />
              </a>
            </h1>
            <nav className={`navegacao ${menuAberto ? 'ativo' : ''}`}>
              <Link to={'/Index'} className="nav-text nav-item"><i className="fas fa-home"></i><span className="nav-label">Início</span></Link>
              <Link to={'/'} className="nav-text nav-item"><i className="fas fa-gamepad"></i><span className="nav-label">Games</span></Link>
              <Link to={'/Que'} className="nav-text nav-item"><i className="fas fa-question-circle"></i><span className="nav-label">Sobre</span></Link>
              <Link to={'/Suporte'} className="nav-text nav-item"><i className="fas fa-headset"></i><span className="nav-label">Suporte</span></Link>
            </nav>
            <button className="hamburguer" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="painel-usuario">
              {formData.usuario ? (
                <Link
                  to={`/Perfil?tipo=${formData.usuario}`}
                  className="link-usuario"
                >
                  <i className="fas fa-user-circle"></i> Perfil ({formData.usuario})
                </Link>
              ) : (
                <>
                  <Link to={'/Login'} className="link-usuario">Login</Link>
                  <Link to={'/Cadastro'} className="link-usuario">Registre-se</Link>
                </>
              )}
            </div>
          </div>
        </header>
      </div>
      
      <div className="game-profile-container">
        <div className="game-profile-content">
          <div className="main-content">
            <div className="game-images-center">
              <div style={{
                width: '400px',
                height: '300px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                fontSize: '18px',
                color: '#666'
              }}>
                Imagem do Jogo
              </div>
            </div>
            <div className="game-info-bottom">
              <h1>{projeto.nomeProjeto}</h1>
              <p>{projeto.descricao}</p>
              <div className="credits-section">
                <p><strong>🎮 Gênero:</strong> {projeto.genero}</p>
                <p><strong>⚙️ Tecnologias:</strong> {projeto.tecnologias}</p>
                <p><strong>📅 Data de Início:</strong> {projeto.dataInicio}</p>
                <p><strong>🚀 Status:</strong> {projeto.statusProjeto}</p>
                <p><strong>👨‍💻 Desenvolvedor:</strong> {projeto.emailDesenvolvedor}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button className="download-btn">Baixar Jogo</button>
                {podeExcluir() && (
                  <button 
                    className="download-btn" 
                    onClick={abrirModalExclusao}
                    style={{ 
                      backgroundColor: '#dc3545', 
                      borderColor: '#dc3545',
                      marginLeft: 'auto'
                    }}
                  >
                    <i className="fas fa-trash"></i> Excluir Projeto
                  </button>
                )}
              </div>
              
              {/* Informações de debug */}
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '14px' }}>
                <h4>Debug Info:</h4>
                <p><strong>Usuário logado:</strong> {formData.email || 'Nenhum'}</p>
                <p><strong>Tipo de usuário:</strong> {formData.usuario || 'Nenhum'}</p>
                <p><strong>É desenvolvedor?</strong> {DeveloperService.isDeveloper() ? 'Sim' : 'Não'}</p>
                <p><strong>Pode excluir?</strong> {podeExcluir() ? 'Sim' : 'Não'}</p>
                <p><strong>Email do projeto:</strong> {projeto.emailDesenvolvedor}</p>
                
                <div style={{ marginTop: '15px' }}>
                  <h5>Testes de Login:</h5>
                  <button 
                    onClick={() => {
                      loginDesenvolvedor();
                      window.location.reload();
                    }}
                    style={{ margin: '5px', padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Login como Desenvolvedor
                  </button>
                  <button 
                    onClick={() => {
                      loginCliente();
                      window.location.reload();
                    }}
                    style={{ margin: '5px', padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Login como Cliente
                  </button>
                  <button 
                    onClick={() => {
                      logout();
                      window.location.reload();
                    }}
                    style={{ margin: '5px', padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {modalExclusaoAberto && (
        <div className="modal-download">
          <div className="modal-download-content">
            <span className="fechar" onClick={fecharModalExclusao}>&times;</span>
            <h2>Excluir Projeto</h2>
            <p>Tem certeza que deseja excluir o projeto "{projeto.nomeProjeto}"?</p>
            <p style={{ color: '#dc3545', fontSize: '14px' }}>Esta ação não pode ser desfeita.</p>
            <div className="download-options">
              <button 
                className="download-option" 
                onClick={excluirProjeto}
                style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
              >
                Confirmar Exclusão
              </button>
              <button className="download-option" onClick={fecharModalExclusao}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Link to={'/'}><img src={esquerda} alt="Seta" className="seta" /></Link>
    </div>
  );
};

export default TesteDescricao;
