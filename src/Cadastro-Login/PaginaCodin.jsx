import React, { useState } from 'react';
import './PaginaCodin.css';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import sonic from "../assets/sonic.png";
import esquerda from "../assets/esquerda.png";
 
const PaginaCodin = () => {
  const [menuAberto, setMenuAberto] = useState(false);
 
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };
 
  return (
    <div className="app">
      <head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </head>
      <header className="cabecalho">
        <div className="conteudo-cabecalho">
          <h1 className="logo">
            <Link to="/" title="Game Legends">
              <img src={Logo} alt="Logo do Game Legends" />
            </Link>
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
          <form className="formulario-pesquisa" action="/search">
            <input required="required" name="q" placeholder="Pesquisar Jogos, Tags ou Criadores" className="input-pesquisa" type="text"/>
            <button className="botao-pesquisa" aria-label="Search">
              <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <div className="painel-usuario">
            <Link className="link-usuario" to="/Login">Login</Link>
            <Link className="link-usuario" to="/Cadastro">Registre-se</Link>
          </div>
        </div>
      </header>
 
      <main className="main">
        <div className="ÇUCA">
          <div className="AAA">
            <div className="container">
              <h1 className="Titu">Redefinir Senha</h1>
              <p className="OP">Coloque o código enviado para sua conta de Email:</p>
              <div className="content">
                <div className="side-image">
                  <img src={sonic} alt="Pixel art character" className="character-icon1" />
                </div>
                <div className="form-content">
                  <form className="Form">
                    <div className="code-inputs">
                      <input type="text" maxLength="1" required />
                      <input type="text" maxLength="1" required />
                      <input type="text" maxLength="1" required />
                      <input type="text" maxLength="1" required />
                      <input type="text" maxLength="1" required />
                      <input type="text" maxLength="1" required />
                    </div>
                    <Link to={'/RedefinirSenha'}><button type="submit" className="botãoconfirmar">CONFIRMAR</button></Link>
                  </form>
                  <p className="Pe">
                    Lembrou a senha? <Link to={'/Login'}><span className="text-blue-500">Faça login</span></Link>
                  </p>
                </div>
                <div className="side-image">
                  <img src={sonic} alt="Pixel art character" className="character-icon1" />
                </div>
              </div>
              <Link to={'/MandarEmail'}><img src={esquerda} alt="Seta" className="SetaLog" /></Link>
            </div>
          </div>
        </div>
      </main>
 
      <footer style={{ backgroundColor: '#90017F', padding: '30px 0', marginTop: '50px' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 15px 0' }}>
              <span style={{ fontWeight: 'bold' }}>Game</span>Legends
            </h2>
            <p style={{ fontSize: '14px', margin: '0 0 20px 0', color: '#ffffff90' }}>
              Game Legends é uma plataforma dedicada a jogos indie, fornecendo uma maneira fácil para desenvolvedores distribuírem seus jogos e para jogadores descobrirem novas experiências.
            </p>
          </div>
         
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            fontSize: '14px'
          }}>
            <span style={{ color: '#ffffff70' }}>
              <i className="fas fa-phone" style={{ marginRight: '5px' }}></i>
              (99) 99999-9999
            </span>
            <span style={{ color: '#ffffff70' }}>
              <i className="fas fa-envelope" style={{ marginRight: '5px' }}></i>
              info@gamelegends.com
            </span>
            <Link to="/Privacidade" style={{ color: '#ffffff70', textDecoration: 'underline' }}>
              Política de Privacidade
            </Link>
          </div>
         
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '15px', color: 'white' }}>Links Rápidos</h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '25px',
              flexWrap: 'wrap',
              fontSize: '14px'
            }}>
              <Link to="/" style={{ color: '#ffffff70', textDecoration: 'none' }}>Games</Link>
              <Link to="/Que" style={{ color: '#ffffff70', textDecoration: 'none' }}>Sobre</Link>
              <Link to="/Suporte" style={{ color: '#ffffff70', textDecoration: 'none' }}>Suporte</Link>
              <Link to="/Cadastro" style={{ color: '#ffffff70', textDecoration: 'none' }}>Registre-se</Link>
              <Link to="/Login" style={{ color: '#ffffff70', textDecoration: 'none' }}>Login</Link>
            </div>
          </div>
         
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <a href="https://www.facebook.com/profile.php?id=61578797307500"
               target="_blank"
               rel="noopener noreferrer"
               style={{ color: 'white', fontSize: '20px' }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/game._legends/"
               target="_blank"
               rel="noopener noreferrer"
               style={{ color: 'white', fontSize: '20px' }}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" style={{ color: 'white', fontSize: '20px' }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" style={{ color: 'white', fontSize: '20px' }}>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
         
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '15px',
            fontSize: '13px',
            color: '#ffffff70'
          }}>
            © 2024 gamelegends.com | Feito pelo time do Game Legends
          </div>
        </div>
      </footer>
    </div>
  );
};
 
export default PaginaCodin;
 