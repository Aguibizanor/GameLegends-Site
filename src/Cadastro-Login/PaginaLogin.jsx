import React, { useState } from "react";
import "./PaginaLogin.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.site.tcc.png";
import stardew from "../assets/stardew.png";
import axios from "axios";
 
function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
 
    // Regex para validar o formato do email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(yahoo|gmail|email)\.com(\.br)?$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Formato de email inválido. Use um email válido como yahoo, gmail ou email.");
      return;
    }
 
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        senha: senha,
      });
 
      if (response.status === 200) {
        localStorage.setItem('usuario', JSON.stringify(response.data));
        alert("Login realizado com sucesso!");
        navigate('/');
      }
    } catch (error) {
      setErrorMessage("Email ou senha incorretos.");
      console.error(error);
    }
  };
 
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
        <div className="login-container">
          <div className="side-image">
            <img src={stardew} alt="Pixel art character" className="character-icon" />
          </div>
          <div className="form-container">
            <div className="header text-center mb-6">
              <h1 className="titulo text-2xl font-bold text-transparent bg-clip-text gradient-button">
                Login
              </h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className="input-single mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Ex: exemplo@yahoo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-single mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Senha:
                </label>
                <input
                  className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="flex items-center justify-between">
                <button className="login-button" type="submit">
                  LOGIN
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                Ainda não tem conta?{" "}
                <Link to="/Cadastro">
                  <span className="text-blue-500">Cadastre-se</span>
                </Link>
              </p>
              <p className="text-gray-500 text-sm">
                Esqueceu a senha?{" "}
                <Link to="/MandarEmail">
                  <span className="text-blue-500">Redefinir senha</span>
                </Link>
              </p>
            </div>
          </div>
          <div className="side-image">
            <img src={stardew} alt="Pixel art character" className="character-icon" />
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
}
 
export default PaginaLogin;
 