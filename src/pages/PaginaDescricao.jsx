import React, { useState, useEffect } from 'react';
import './PaginaDescricao.css';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import esquerda from "../assets/esquerda.png";
 
// Imagens do projeto Happy Cat Tavern
import happy from '../assets/happy.png';
import gatodesc from '../assets/gatodesc.png';
import gatodesc1 from '../assets/gatodesc1.png';
 
const PaginaDescricao = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalImagemAberto, setModalImagemAberto] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [modalDownloadAberto, setModalDownloadAberto] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    usuario: ""
  });
 
  // Imagens do carrossel
  const imagens = [gatodesc, gatodesc1, happy, happy];
 
  // Dados do projeto fixos para o exemplo
  const projeto = {
    nomeProjeto: "Happy Cat Tavern: Typing Challenge",
    descricao: "Batou quer beber o máximo de milkshakes que puder enquanto os clientes da taverna o animam. Cada palavra é um milkshake para Batou beber. Digite com rapidez e precisão para ganhar pontos e desbloquear conquistas!",
    objetivo: "O jogador deve digitar palavras que aparecem na tela com rapidez e precisão. Cada palavra digitada corretamente conta como um 'milixinale' que Balsou bebe. O objetivo é acumular pontos bebendo o máximo possível.",
    progressao: "O jogo inclui um sistema de pontuação e conquistas (achievements) para serem desbloqueadas, incentivando a rejogabilidade e a melhoria das habilidades de digitação.",
    genero: "Typing Challenge / Casual",
    tecnologias: "Unity",
    dataInicio: "2024",
    statusProjeto: "Concluído",
    estetica: "Temática de fantasia casual com estética animada e fofinha (devido ao nome 'Happy Cat' e à arte de Miyasuki)"
  };
 
  useEffect(() => {
    // Verifica se o usuário está logado
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setFormData({
        email: usuarioData.email,
        usuario: usuarioData.usuario
      });
    }
  }, []);
 
  const toggleMenu = () => setMenuAberto(!menuAberto);
  const abrirModalImagem = (index) => { setImagemAtual(index); setModalImagemAberto(true); };
  const fecharModalImagem = () => setModalImagemAberto(false);
  const imagemAnterior = () => setImagemAtual((imagemAtual - 1 + imagens.length) % imagens.length);
  const proximaImagem = () => setImagemAtual((imagemAtual + 1) % imagens.length);
  const abrirModalDownload = () => setModalDownloadAberto(true);
  const fecharModalDownload = () => setModalDownloadAberto(false);
 
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
              <img src={happy} alt={projeto.nomeProjeto} className="main-game-img" />
              <div className="extra-images">
                <img src={gatodesc} alt="Screenshot 1" className="extra-img" onClick={() => abrirModalImagem(0)} />
                <img src={gatodesc1} alt="Screenshot 2" className="extra-img" onClick={() => abrirModalImagem(1)} />
                <img src={happy} alt="Screenshot 3" className="extra-img" onClick={() => abrirModalImagem(2)} />
              </div>
            </div>
            <div className="game-info-bottom">
              <h1>{projeto.nomeProjeto}</h1>
              <p>{projeto.descricao}</p>
              <div className="credits-section">
                <p><strong>Créditos:</strong></p>
                <p>Artista: Miyasuki (<a href="#">Twitter</a> / <a href="#">Etsy</a>)</p>
                <p>Programador: OnyxHeart (<a href="#">Twitter</a>)</p>
              </div>
              <button className="download-btn" onClick={abrirModalDownload}>Baixar Jogo</button>
            </div>
          </div>
        </div>
      </div>
      {modalImagemAberto && (
        <div className="modal-imagem">
          <span className="fechar" onClick={fecharModalImagem}>&times;</span>
          <img className="modal-conteudo" src={imagens[imagemAtual]} alt={`Imagem ${imagemAtual + 1}`} />
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
 
export default PaginaDescricao;

