import React, { useState } from 'react';
import './PaginaRedefinirSenha.css';
import { Link } from "react-router-dom";
import Logo from "../assets/logo.site.tcc.png";
import mario from "../assets/mario.png";
import esquerda from "../assets/esquerda.png";
 
const PaginaRedefinirSenha = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
 
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!senha.trim() || !confirmarSenha.trim()) {
      alert('Por favor, preencha todos os campos de senha.');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem. Tente novamente.');
      return;
    }
    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    window.location.href = '/Login';
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
                  <form className="pagina-redefinir-senha-kaka" onSubmit={handleSubmit}>
                    <label>Senha:</label>
                    <input
                      type="password"
                      required
                      className="pagina-redefinir-senha-mumu"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Digite sua nova senha"
                    />
                    <label>Confirme senha:</label>
                    <input
                      type="password"
                      required
                      className="pagina-redefinir-senha-mumu"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      placeholder="Confirme sua nova senha"
                    />
                    <button type="submit" className="pagina-redefinir-senha-frufru">CONFIRMAR</button>
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
 
export default PaginaRedefinirSenha;
 
 