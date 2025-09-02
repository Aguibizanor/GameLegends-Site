import React, { useState } from 'react';
import './PaginaMandarEmail.css';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.site.tcc.png";
import viva from "../assets/viva.png";
import RedefinirSenhaService from '../services/RedefinirSenhaService';
 
const PaginaMandarEmail = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };
 
  const _isRealEmailProvider = (email) => {
    if (!email.includes('@')) return false;
   
    const domain = email.toLowerCase().substring(email.indexOf('@'));
    const realProviders = [
      '@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com',
      '@live.com', '@icloud.com', '@protonmail.com', '@uol.com.br',
      '@bol.com.br', '@terra.com.br'
    ];
   
    return realProviders.includes(domain);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('Por favor, insira seu email para redefinir a senha.');
      return;
    }
   
    setLoading(true);
    setMessage('');
   
    try {
      const resultado = await RedefinirSenhaService.enviarCodigo(email);
     
      if (resultado) {
        const isReal = RedefinirSenhaService.isEmailReal;
        const message = isReal
          ? `📧 Código enviado para seu email real: ${email}`
          : `💾 Código gerado para email cadastrado: ${email}`;
         
        setMessage(message);
        setTimeout(() => {
          navigate('/MandarCodin');
        }, 2000);
      }
    } catch (e) {
      setMessage(`❌ Erro: ${e.toString().replace('Error: ', '')}`);
    } finally {
      setLoading(false);
    }
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
        <div className="MINERIO">
          <div className="AAA1">
            <div className="container">
              <h1 className="W">Redefinir Senha</h1>
              <p className="Redef">Para redefinir sua senha, coloque seu Email:</p>
              <div className="content">
                <div className="side-image">
                  <img src={viva} alt="Pixel art character" className="character-icon2" />
                </div>
                <div className="form-content">
                  <form className="For" onSubmit={handleSubmit}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="email"
                        required
                        className="LOLO"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email (Gmail, Yahoo, etc.)"
                        style={{ paddingRight: email ? '40px' : '12px' }}
                      />
                      {email && (
                        <span style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '18px'
                        }}>
                          {_isRealEmailProvider(email) ? '📧' : '💾'}
                        </span>
                      )}
                    </div>
                    <button type="submit" className="mandar_email" disabled={loading}>
                      {loading ? 'ENVIANDO...' : 'ENVIAR CÓDIGO'}
                    </button>
                    {message && (
                      <div style={{
                        marginTop: '15px',
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
                        color: message.includes('✅') ? '#155724' : '#721c24',
                        border: message.includes('✅') ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
                      }}>
                        {message}
                      </div>
                    )}
                  </form>
                  <p className="KI">
                    Lembrou a senha? <Link to={'/Login'}><span className="text-blue-500">Faça login</span></Link>
                  </p>
                </div>
                <div className="side-image">
                  <img src={viva} alt="Pixel art character" className="character-icon2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
 
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
              <a href="https://www.reddit.com/r/Game_Legends_jogos/s/GZVUlKiWg8" target="_blank" rel="noopener noreferrer"
                 style={{
                   backgroundColor: '#FF6B6B',
                   borderRadius: '50%',
                   width: '50px',
                   height: '50px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   textDecoration: 'none'
                 }}><i className="fab fa-reddit" style={{ color: 'white', fontSize: '20px' }}></i>
              </a>
              <a href="https://www.reddit.com/r/Game_Legends_jogos/s/GZVUlKiWg8"
                 target="_blank"
                 rel="noopener noreferrer"
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
 
export default PaginaMandarEmail;
 

