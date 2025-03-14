import React, { useState } from "react";
import "./PaginaLogin.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.site.tcc.png";
import stardew from "../assets/stardew.png";
import esquerda from "../assets/esquerda.png";
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
        tipoUsuario: tipoUsuario
      });
 
      if (response.status === 200) {
        localStorage.setItem('usuario', JSON.stringify(response.data));
        alert("Login realizado com sucesso!");
        navigate('/1');
      }
    } catch (error) {
      setErrorMessage("Email, senha ou tipo de usuário incorretos.");
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
              <div className="tipo-usuario">
                <label>
                  <input
                    type="radio"
                    name="tipoUsuario"
                    value="cliente"
                    checked={tipoUsuario === 'cliente'}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                  />
                  Cliente
                </label>
                <label>
                  <input
                    type="radio"
                    name="tipoUsuario"
                    value="desenvolvedor"
                    checked={tipoUsuario === 'desenvolvedor'}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                  />
                  Desenvolvedor
                </label>
                <label>
                  <input
                    type="radio"
                    name="tipoUsuario"
                    value="administrador"
                    checked={tipoUsuario === 'administrador'}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                  />
                  Administrador
                </label>
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
              <a href="#"><i class="fab fa-twitter"></i></a>
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
}
 
export default PaginaLogin;