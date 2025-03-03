import React, { useState } from 'react';
import './PaginaRedefinirSenha.css';
import { Link } from "react-router-dom";
import Logo from "../assets/logo.site.tcc.png";
import mario from "../assets/mario.png";
import esquerda from "../assets/esquerda.png";

const PaginaRedefinirSenha = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="pagina-redefinir-senha-app">
      <head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </head>
      <header className="pagina-redefinir-senha-cabecalho">
        <div className="pagina-redefinir-senha-conteudo-cabecalho">
          <h1 className="pagina-redefinir-senha-logo">
            <Link to="/" title="Game Legends">
              <img src={Logo} alt="Logo do Game Legends" />
            </Link>
          </h1>
          <nav className={`pagina-redefinir-senha-navegacao ${menuAberto ? 'ativo' : ''}`}>
            <Link to={'/Index'} className="pagina-redefinir-senha-nav-text pagina-redefinir-senha-nav-item"><i className="fas fa-home"></i><span className="pagina-redefinir-senha-nav-label">Início</span></Link>
            <Link to={'/'} className="pagina-redefinir-senha-nav-text pagina-redefinir-senha-nav-item"><i className="fas fa-gamepad"></i><span className="pagina-redefinir-senha-nav-label">Games</span></Link>
            <Link to={'/Que'} className="pagina-redefinir-senha-nav-text pagina-redefinir-senha-nav-item"><i className="fas fa-question-circle"></i><span className="pagina-redefinir-senha-nav-label">Sobre</span></Link>
            <Link to={'/Suporte'} className="pagina-redefinir-senha-nav-text pagina-redefinir-senha-nav-item"><i className="fas fa-headset"></i><span className="pagina-redefinir-senha-nav-label">Suporte</span></Link>
          </nav>
          <button className="pagina-redefinir-senha-hamburguer" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <form className="pagina-redefinir-senha-formulario-pesquisa" action="/search">
            <input required="required" name="q" placeholder="Pesquisar Jogos, Tags ou Criadores" className="pagina-redefinir-senha-input-pesquisa" type="text"/>
            <button className="pagina-redefinir-senha-botao-pesquisa" aria-label="Search">
              <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" className="pagina-redefinir-senha-icone-pesquisa" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <div className="pagina-redefinir-senha-painel-usuario">
            <Link className="pagina-redefinir-senha-link-usuario" to="/Login">Login</Link>
            <Link className="pagina-redefinir-senha-link-usuario" to="/Cadastro">Registre-se</Link>
          </div>
        </div>
      </header>

      <main className="pagina-redefinir-senha-main">
        <div className="pagina-redefinir-senha-oia">
          <div className="pagina-redefinir-senha-aaa1">
            <div className="pagina-redefinir-senha-container">
              <h1 className="pagina-redefinir-senha-h">Redefinir Senha</h1>
              <p className="pagina-redefinir-senha-vivi">Pronto! Agora coloque sua senha nova:</p>
              <div className="pagina-redefinir-senha-content">
                <div className="pagina-redefinir-senha-side-image">
                  <img src={mario} alt="Pixel art character" className="pagina-redefinir-senha-character-icon3" />
                </div>
                <div className="pagina-redefinir-senha-form-content">
                  <form className="pagina-redefinir-senha-kaka">
                    <label>Senha:</label>
                    <input type="password" required className="pagina-redefinir-senha-mumu" />
                    <label>Confirme senha:</label>
                    <input type="password" required className="pagina-redefinir-senha-mumu" />
                    <Link to={'/Login'}><button type="submit" className="pagina-redefinir-senha-frufru">CONFIRMAR</button></Link>
                  </form>
                  <p className="pagina-redefinir-senha-baba">
                    Lembrou a senha? <Link to={'/Login'}><span className="text-blue-500">Faça login</span></Link>
                  </p>
                </div>
                <div className="pagina-redefinir-senha-side-image">
                  <img src={mario} alt="Pixel art character" className="pagina-redefinir-senha-character-icon3" />
                </div>
              </div>
              <Link to={'/MandarCodin'}><img src={esquerda} alt="Seta" className="pagina-redefinir-senha-seta-log" /></Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="pagina-redefinir-senha-rodape">
        <div className="pagina-redefinir-senha-conteudo-rodape">
          <div className="pagina-redefinir-senha-secao-rodape sobre">
            <h1 className="pagina-redefinir-senha-logo-rodape"><span>Game</span>Legends</h1>
            <p>
              Game Legends é uma plataforma dedicada a jogos indie, fornecendo uma maneira fácil para desenvolvedores distribuírem seus jogos e para jogadores descobrirem novas experiências.
            </p>
            <div className="pagina-redefinir-senha-contato-rodape">
              <span><i className="fas fa-phone"></i> &nbsp; (99) 99999-9999</span>
              <span><i className="fas fa-envelope"></i> &nbsp; info@gamelegends.com</span>
            </div>
            <div className="pagina-redefinir-senha-redes-sociais">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="pagina-redefinir-senha-secao-rodape links">
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
        <div className="pagina-redefinir-senha-rodape-inferior">
          &copy; gamelegends.com | Feito pelo time do Game Legends 
        </div>
      </footer>
    </div>
  );
};

export default PaginaRedefinirSenha;