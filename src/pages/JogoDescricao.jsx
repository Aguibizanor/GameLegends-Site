import React, { useState, useEffect } from 'react';
import './PaginaDescricao.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import esquerda from "../assets/esquerda.png";
import DeveloperService from '../services/DeveloperService';
import ApiService from '../services/ApiService';

const JogoDescricao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalImagemAberto, setModalImagemAberto] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [modalDownloadAberto, setModalDownloadAberto] = useState(false);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    usuario: ""
  });

  // Imagens padrão para projetos sem imagens específicas
  const imagensPadrao = [
    ApiService.getFotoProjetoUrl(id),
    ApiService.getFotoProjetoUrl(id),
    ApiService.getFotoProjetoUrl(id)
  ];

  useEffect(() => {
    if (id) {
      // Busca apenas no banco de dados
      ApiService.buscarProjetoPorId(id)
        .then(data => {
          setProjeto(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar projeto:', error);
          setLoading(false);
        });
    }

    // Verifica se o usuário está logado
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setFormData({
        email: usuarioData.email,
        usuario: usuarioData.usuario
      });
    }
  }, [id]);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const abrirModalImagem = (index) => { setImagemAtual(index); setModalImagemAberto(true); };
  const fecharModalImagem = () => setModalImagemAberto(false);
  const imagemAnterior = () => setImagemAtual((imagemAtual - 1 + imagensPadrao.length) % imagensPadrao.length);
  const proximaImagem = () => setImagemAtual((imagemAtual + 1) % imagensPadrao.length);
  const abrirModalDownload = () => setModalDownloadAberto(true);
  const fecharModalDownload = () => setModalDownloadAberto(false);
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

  if (loading) return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #90017F 0%, #B19CD9 100%)', color: 'white', fontSize: '1.5rem'}}>
      🎮 Carregando seu jogo incrível...
    </div>
  );
  
  if (!projeto) return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)', color: 'white', textAlign: 'center'}}>
      <div style={{fontSize: '4rem', marginBottom: '20px'}}>😭</div>
      <h2 style={{fontSize: '2rem', marginBottom: '15px'}}>Oops! Jogo não encontrado</h2>
      <p style={{fontSize: '1.2rem', marginBottom: '30px'}}>Parece que este jogo saiu para uma aventura!</p>
      <Link to="/" style={{background: 'white', color: '#FF6B35', padding: '15px 30px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem'}}>
        🎆 Voltar para os Jogos
      </Link>
    </div>
  );

  return (
    <div className="GIT gradient-bg">
      <div className="app7">
        <header className="cabecalho">
          <div className="conteudo-cabecalho">
            <h1 className="logo">
              <a href="/Index" title="Game Legends">
                <img src={Logo} alt="Logo do Game Legends" />
              </a>
            </h1>
            <nav className={`navegacao ${menuAberto ? 'ativo' : ''}`}>
              {menuAberto && (
                <form className="formulario-pesquisa" action="/search" style={{
                  width: '100%',
                  margin: '10px 0',
                  padding: '0 20px'
                }}>
                  <input
                    required="required"
                    name="q"
                    placeholder="Pesquisar Jogos, Tags ou Criadores"
                    className="input-pesquisa"
                    type="text"
                    style={{ width: '100%' }}
                  />
                  <button className="botao-pesquisa" aria-label="Search">
                    <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </button>
                </form>
              )}
              <Link to={'/Index'} className="nav-text nav-item"><i className="fas fa-home"></i><span className="nav-label">Início</span></Link>
              <Link to={'/'} className="nav-text nav-item"><i className="fas fa-gamepad"></i><span className="nav-label">Games</span></Link>
              <Link to={'/Que'} className="nav-text nav-item"><i className="fas fa-question-circle"></i><span className="nav-label">Sobre</span></Link>
              <Link to={'/Suporte'} className="nav-text nav-item"><i className="fas fa-headset"></i><span className="nav-label">Suporte</span></Link>
            </nav>
            <button className="hamburguer" onClick={toggleMenu} style={{
              position: menuAberto ? 'fixed' : 'static',
              top: menuAberto ? '195px' : 'auto',
              right: menuAberto ? '20px' : 'auto',
              zIndex: menuAberto ? 100000 : 'auto'
            }}>
              <i className="fas fa-bars"></i>
            </button>
            <form className="formulario-pesquisa" action="/search">
              <input required="required" name="q" placeholder="Pesquisar Jogos, Tags ou Criadores" className="input-pesquisa" type="text"/>
              <button className="botao-pesquisa" aria-label="Search">
                <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
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
              <img 
                src={ApiService.getFotoProjetoUrl(projeto.id)} 
                alt={projeto.nomeProjeto} 
                className="main-game-img" 
              />
              <div className="extra-images">
                <img src={ApiService.getFotoProjetoUrl(projeto.id)} alt="Screenshot 1" className="extra-img" onClick={() => abrirModalImagem(0)} />
                <img src={ApiService.getFotoProjetoUrl(projeto.id)} alt="Screenshot 2" className="extra-img" onClick={() => abrirModalImagem(1)} />
                <img src={ApiService.getFotoProjetoUrl(projeto.id)} alt="Screenshot 3" className="extra-img" onClick={() => abrirModalImagem(2)} />
              </div>
            </div>
            <div className="game-info-bottom">
              <h1>{projeto.nomeProjeto}</h1>
              <p>{projeto.descricao}</p>
              <div className="credits-section">
                <p><strong>🎮 Gênero:</strong> {projeto.genero || 'Não informado'}</p>
                <p><strong>⚙️ Tecnologias:</strong> {projeto.tecnologias || 'Não informado'}</p>
                <p><strong>📅 Data de Início:</strong> {projeto.dataInicio || 'Não informado'}</p>
                <p><strong>🚀 Status:</strong> {projeto.statusProjeto || 'Não informado'}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button className="download-btn" onClick={abrirModalDownload}>Baixar Jogo</button>
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
            </div>
          </div>
        </div>
      </div>
      {modalImagemAberto && (
        <div className="modal-imagem">
          <span className="fechar" onClick={fecharModalImagem}>&times;</span>
          <img className="modal-conteudo" src={imagensPadrao[imagemAtual]} alt={`Imagem ${imagemAtual + 1}`} />
          <a className="anterior" onClick={imagemAnterior}>&#10094;</a>
          <a className="proxima" onClick={proximaImagem}>&#10095;</a>
        </div>
      )}
      {modalDownloadAberto && (
        <div className="modal-download">
          <div className="modal-download-content">
            <span className="fechar" onClick={fecharModalDownload}>&times;</span>
            <h2>Download - {projeto.nomeProjeto}</h2>
            <p>Baixe o jogo em uma das opções disponíveis:</p>
            <div className="download-options">
              <button className="download-option">Windows</button>
              <button className="download-option">Linux</button>
              <button className="download-option">Android</button>
              <button className="download-option">iOS</button>
            </div>
          </div>
        </div>
      )}
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
      <footer style={{ backgroundColor: '#90017F', padding: '40px 20px', marginTop: '50px' }}>
        <div style={{ textAlign: 'center', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', margin: '0 0 20px 0', fontWeight: 'bold' }}>
            GameLegends
          </h2>
          <p style={{ fontSize: '16px', margin: '0 0 30px 0', lineHeight: '1.6' }}>
            🎮 Game Legends é uma plataforma dedicada a jogos indie, fornecendo uma maneira fácil para desenvolvedores distribuírem seus jogos e para jogadores descobrirem novas experiências! 🎉
          </p>
         
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                backgroundColor: '#00BCD4',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-phone" style={{ color: 'white', fontSize: '16px' }}></i>
              </div>
              <span style={{ fontSize: '16px' }}>(99) 99999-9999</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                backgroundColor: '#FF9800',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="fas fa-envelope" style={{ color: 'white', fontSize: '16px' }}></i>
              </div>
              <span style={{ fontSize: '16px' }}>gamelegends.jogos@gmail.com</span>
            </div>
          </div>
         
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'white' }}>
              🌟 Siga-nos nas Redes Sociais 🌟
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <a href="https://www.facebook.com/profile.php?id=61578797307500"
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{
                   backgroundColor: '#1877F2',
                   borderRadius: '50%',
                   width: '50px',
                   height: '50px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   textDecoration: 'none'
                 }}>
                <i className="fab fa-facebook-f" style={{ color: 'white', fontSize: '20px' }}></i>
              </a>
              <a href="https://www.instagram.com/game._legends/"
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{
                   backgroundColor: '#E4405F',
                   borderRadius: '50%',
                   width: '50px',
                   height: '50px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   textDecoration: 'none'
                 }}>
                <i className="fab fa-instagram" style={{ color: 'white', fontSize: '20px' }}></i>
              </a>
              <a href="https://www.reddit.com/r/Game_Legends_jogos/s/GZVUlKiWg8"
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{
                   backgroundColor: '#FF6B6B',
                   borderRadius: '50%',
                   width: '50px',
                   height: '50px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   textDecoration: 'none'
                 }}>
                <i className="fab fa-reddit" style={{ color: 'white', fontSize: '20px' }}></i>
              </a>
              <a href="#"
                 style={{
                   backgroundColor: '#4FC3F7',
                   borderRadius: '50%',
                   width: '50px',
                   height: '50px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   textDecoration: 'none'
                 }}>
                <i className="fas fa-globe" style={{ color: 'white', fontSize: '20px' }}></i>
              </a>
            </div>
          </div>
         
          <Link to="/Privacidade" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '10px 20px',
            borderRadius: '25px',
            color: 'white',
            textDecoration: 'none',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            <i className="fas fa-user-shield"></i>
            Política de Privacidade
          </Link>
         
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '20px',
            fontSize: '14px',
            color: '#ffffff90'
          }}>
            © Game Legends ✨ | Feito com 💜 pelo nosso time incrível!
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JogoDescricao;

