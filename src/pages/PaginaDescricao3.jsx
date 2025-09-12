import React, { useState, useEffect } from 'react';
import './PaginaDescricao.css';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import esquerda from "../assets/esquerda.png";
 
// Imagens do projeto Subida de Pombo
import pombo from '../assets/pombo.png';
 
const PaginaDescricao3 = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalImagemAberto, setModalImagemAberto] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [modalDownloadAberto, setModalDownloadAberto] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    usuario: "",
    nome: ""
  });
 
  // Imagens do carrossel
  const imagens = [pombo, pombo, pombo, pombo];
 
  // Dados do projeto Subida de Pombo
  const projeto = {
    nomeProjeto: "Subida de Pombo",
    descricao: "Uma aventura épica de escalada! Cuide do seu pombo corajoso enquanto ele enfrenta desafios cada vez mais difíceis em sua jornada para o topo. Lute contra inimigos únicos, colete power-ups e prepare-se para o confronto final contra o lendário Deus Pombo. Cada subida é uma nova oportunidade de superar seus limites!",
    genero: "Aventura / Plataforma / Escalada",
    tecnologias: "Unity, C#",
    dataInicio: "2024",
    statusProjeto: "Em Desenvolvimento"
  };
 
  useEffect(() => {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setFormData({
        email: usuarioData.email,
        usuario: usuarioData.usuario,
        nome: usuarioData.nome
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
                <Link to={`/Perfil?tipo=${formData.usuario}`} className="link-usuario">
                  <i className="fas fa-user-circle"></i> Perfil ({formData.nome?.split(' ')[0] || formData.usuario})
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
              <img src={pombo} alt={projeto.nomeProjeto} className="main-game-img" />
              <div className="extra-images">
                <img src={pombo} alt="Screenshot 1" className="extra-img" onClick={() => abrirModalImagem(0)} />
                <img src={pombo} alt="Screenshot 2" className="extra-img" onClick={() => abrirModalImagem(1)} />
                <img src={pombo} alt="Screenshot 3" className="extra-img" onClick={() => abrirModalImagem(2)} />
              </div>
            </div>
            <div className="game-info-bottom">
              <h1>{projeto.nomeProjeto}</h1>
              <p>{projeto.descricao}</p>
              <div className="credits-section">
                <p><strong>Créditos:</strong></p>
                <p>Desenvolvedor: SkyClimber Games (<a href="#">Twitter</a> / <a href="#">Itch.io</a>)</p>
                <p>Artista: FeatherArt Studio (<a href="#">Instagram</a>)</p>
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
    </div>
  );
};
 
export default PaginaDescricao3;