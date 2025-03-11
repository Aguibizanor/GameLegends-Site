import React, { useState } from 'react';
import './PaginaDescricao.css'; // Certifique-se de criar esse arquivo CSS para os estilos
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import gato1 from "../assets/gato1.png";
import gato2 from "../assets/gato2.png";
import gato3 from "../assets/gato3.png";
import esquerda from "../assets/esquerda.png";

const PaginaDescricao = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="GIT">
      <div className="app7">
        <head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
        </head>
        <header className="cabecalho">
          <div className="conteudo-cabecalho">
            <div className="logo"><img src={Logo} alt="Logo" /></div>
            <nav className={`navegacao ${menuAberto ? 'ativo' : ''}`}>
              <Link to={'/Index'} className="nav-item"><i className="fas fa-home"></i><span className="nav-label">Início</span></Link>
              <Link to={'/'} className="nav-item"><i className="fas fa-gamepad"></i><span className="nav-label">Games</span></Link>
              <Link to={'/Que'} className="nav-item"><i className="fas fa-question-circle"></i><span className="nav-label">Sobre</span></Link>
              <Link to={'/Suporte'} className="nav-item"><i className="fas fa-headset"></i><span className="nav-label">Suporte</span></Link>
            </nav>
            <button className="hamburguer" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
            <form className="formulario-pesquisa">
              <input required="required" name="q" placeholder="Pesquisar Jogos, Tags ou Criadores" className="input-pesquisa" type="text"/>
              <button className="botao-pesquisa" aria-label="Pesquisar">
                <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
            <div className="painel-usuario">
              <a className="link-usuario" href="/Login">Login</a>
              <a className="link-usuario" href="/Cadastro">Registre-se</a>
            </div>
          </div>
        </header>
      </div>
      <div className="game-profile-container">
        <div className="game-profile-content">
          <div className="main-content">
            <img src={gato3} alt="Happy Cat Tavern" className="main-game-img" />
            <div className="extra-images">
              <img src={gato1} alt="Descrição 1" className="extra-img" />
              <img src={gato2} alt="Descrição 2" className="extra-img" />
              <img src={gato1} alt="Descrição 3" className="extra-img" />
            </div>
            <div className="description">
              <h1>Happy Cat Tavern: Typing Challenge</h1>
              <p>
                Batou quer beber o máximo de milkshakes que puder enquanto os
                clientes da taverna o animam. Cada palavra é um milkshake para
                Batou beber. Digite com rapidez e precisão para ganhar pontos e
                desbloquear conquistas!
              </p>
              <div className="credits">
                <h3>Créditos:</h3>
                <p>
                  <strong>Artista:</strong> Miyaualit (
                  <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    Twitter
                  </a>{' '}
                  /{' '}
                  <a href="https://etsy.com" target="_blank" rel="noreferrer">
                    Etsy
                  </a>
                  )<br />
                  <strong>Programador:</strong> OnyxHeart (
                  <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    Twitter
                  </a>
                  )
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="game-profile-footer">
          <button className="download-btn">Download</button>
        </div>
      </div>
      <Link to={'/'}><img src={esquerda} alt="Seta" className="seta" /></Link>
      <footer className="rodape">
        <div className="conteudo-rodape">
          <div className="secao-rodape sobre">
            <h1 className="logo-rodape"><span>Game</span>Legends</h1>
            <p>
              Game Legends é uma plataforma dedicada a jogos indie, fornecendo uma maneira fácil para desenvolvedores distribuírem seus jogos e para jogadores descobrirem novas experiências.
            </p>
            <div className="contato-rodape">
              <span><i className="fas fa-phone"></i> &nbsp; (99) 99999-9999</span>
              <span><i className="fas fa-envelope"></i> &nbsp; info@gamelegends.com</span>
            </div>
            <div className="redes-sociais">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="secao-rodape links">
            <h2>Links Rápidos</h2>
            <ul>
              <a href="#"><li>Eventos</li></a>
              <a href="#"><li>Equipe</li></a>
              <a href="#"><li>Missão</li></a>
              <a href="#"><li>Serviços</li></a>
              <a href="#"><li>Afiliados</li></a>
            </ul>
          </div>
        </div>
        <div className="rodape-inferior">
          &copy; gamelegends.com | Feito pelo time do Game Legends 
        </div>
      </footer>
    </div>
  );
};

export default PaginaDescricao;