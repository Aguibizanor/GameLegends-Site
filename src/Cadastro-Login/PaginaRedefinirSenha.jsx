import React, { useState } from 'react';
import './PaginaRedefinirSenha.css';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.site.tcc.png";
import mario from "../assets/mario.png";
import esquerda from "../assets/esquerda.png";
import RedefinirSenhaService from '../services/RedefinirSenhaService';
 
const PaginaRedefinirSenha = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!senha.trim() || !confirmarSenha.trim()) {
      setMessage('❌ Por favor, preencha todos os campos de senha.');
      return;
    }
    if (senha !== confirmarSenha) {
      setMessage('❌ As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      setMessage('❌ A senha deve ter pelo menos 6 caracteres.');
      return;
    }
 
    setLoading(true);
    setMessage('');
 
    try {
      const sucesso = await RedefinirSenhaService.redefinirSenha(senha);
     
      if (sucesso) {
        setMessage('✅ Senha redefinida com sucesso!');
        setTimeout(() => {
          navigate('/Login');
        }, 2000);
      } else {
        setMessage('❌ Erro ao redefinir senha');
      }
    } catch (e) {
      setMessage(`❌ Erro: ${e.toString()}`);
    } finally {
      setLoading(false);
    }
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
              <h1 className="pagina-redefinir-senha-h">Nova Senha</h1>
              <p className="pagina-redefinir-senha-vivi">Agora você pode definir uma nova senha:</p>
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
                    <button type="submit" className="pagina-redefinir-senha-frufru" disabled={loading}>
                      {loading ? 'REDEFININDO...' : 'REDEFINIR SENHA'}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <Link to={'/MandarCodin'} style={{ color: '#666', textDecoration: 'none' }}>← Voltar</Link>
                    <Link to={'/Login'} style={{ color: '#007bff', textDecoration: 'none' }}>Fazer login</Link>
                  </div>
                </div>
                <div className="pagina-redefinir-senha-side-image">
                  <img src={mario} alt="Pixel art character" className="pagina-redefinir-senha-character-icon3" />
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
 
export default PaginaRedefinirSenha;
 
 