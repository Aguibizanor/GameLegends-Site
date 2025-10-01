import React, { useState, useEffect } from 'react';
import './PaginaDescricao.css';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import esquerda from "../assets/esquerda.png";

// Imagens do projeto Happy Cat Tavern
import happy from '../assets/happy.png';
import gatodesc from '../assets/gatodesc.png';
import gatodesc1 from '../assets/gatodesc1.png';

const JogoCarrossel = () => {
  const { id } = useParams();
  const [modalImagemAberto, setModalImagemAberto] = useState(false);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [modalDownloadAberto, setModalDownloadAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Imagens do carrossel
  const imagens = [gatodesc, gatodesc1, happy, happy];

  // Dados estáticos para os jogos do carrossel
  const jogosEstaticos = {
    '1': {
      id: 1,
      nomeProjeto: "Happy Cat Tavern: Typing Challenge",
      descricao: "Batou quer beber o máximo de milkshakes que puder enquanto os clientes da taverna o animam. Cada palavra é um milkshake para Batou beber. Digite com rapidez e precisão para ganhar pontos e desbloquear conquistas!",
      genero: "Typing Challenge / Casual",
      tecnologias: "Unity",
      dataInicio: "2024",
      statusProjeto: "Concluído"
    },
    '2': {
      id: 2,
      nomeProjeto: "Coop Catacombs: Roguelike",
      descricao: "Nas masmorras, acompanhando em todos os momentos e poderá presenciar os rastros de outros aventureiros. Um jogo cooperativo de exploração e sobrevivência.",
      genero: "Roguelike / Cooperativo",
      tecnologias: "Unity",
      dataInicio: "2024",
      statusProjeto: "Em Desenvolvimento"
    },
    '3': {
      id: 3,
      nomeProjeto: "Subida de Pombo",
      descricao: "Cuide do seu próprio pombo enquanto ele luta contra inimigos cada vez mais fortes e, no final, enfrente o lendário Deus Pombo. Uma aventura épica de crescimento e desafios.",
      genero: "Aventura / Ação",
      tecnologias: "Unity",
      dataInicio: "2024",
      statusProjeto: "Concluído"
    }
  };

  const projeto = jogosEstaticos[id];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const abrirModalImagem = (index) => { setImagemAtual(index); setModalImagemAberto(true); };
  const fecharModalImagem = () => setModalImagemAberto(false);
  const imagemAnterior = () => setImagemAtual((imagemAtual - 1 + imagens.length) % imagens.length);
  const proximaImagem = () => setImagemAtual((imagemAtual + 1) % imagens.length);
  const abrirModalDownload = () => setModalDownloadAberto(true);
  const fecharModalDownload = () => setModalDownloadAberto(false);

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
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </head>
      <Header />
      <div className="game-profile-container">
        <div className="game-profile-content">
          <div className="main-content">
            <div className="game-images-center">
              <img 
                src={happy} 
                alt={projeto.nomeProjeto} 
                className="main-game-img" 
              />
              <div className="extra-images" style={isMobile ? {
                display: 'flex',
                gap: '10px',
                marginTop: '15px',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginLeft: '20px'
              } : {}}>
                <img 
                  src={happy} 
                  alt="Screenshot 1" 
                  className="extra-img" 
                  onClick={() => abrirModalImagem(0)} 
                  style={isMobile ? {
                    width: '120px',
                    height: '90px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: '8px'
                  } : {}}
                />
                <img 
                  src={gatodesc} 
                  alt="Screenshot 2" 
                  className="extra-img" 
                  onClick={() => abrirModalImagem(1)} 
                  style={isMobile ? {
                    width: '120px',
                    height: '90px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: '8px'
                  } : {}}
                />
                <img 
                  src={gatodesc1} 
                  alt="Screenshot 3" 
                  className="extra-img" 
                  onClick={() => abrirModalImagem(2)} 
                  style={isMobile ? {
                    width: '120px',
                    height: '90px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: '8px'
                  } : {}}
                />
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

export default JogoCarrossel;