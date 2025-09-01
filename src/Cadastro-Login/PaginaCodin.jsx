import React, { useState } from 'react';
import './PaginaCodin.css';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import sonic from "../assets/sonic.png";
import esquerda from "../assets/esquerda.png";
 
const PaginaCodin = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
 
  React.useEffect(() => {
    // Recuperar email do localStorage
    const savedEmail = localStorage.getItem('resetEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);
 
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length !== 6) {
      alert('Por favor, insira o código completo de 6 dígitos.');
      return;
    }
   
    if (!novaSenha || novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
   
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
   
    setLoading(true);
    setMessage('');
   
    try {
      const response = await fetch('http://localhost:8080/login/redefinir-senha/confirmar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          codigo: codigoCompleto,
          novaSenha: novaSenha
        })
      });
     
      const result = await response.text();
     
      if (response.ok) {
        setMessage('✅ Senha alterada com sucesso!');
        localStorage.removeItem('resetEmail');
        setTimeout(() => {
          window.location.href = '/Login';
        }, 2000);
      } else {
        setMessage('❌ ' + result);
      }
    } catch (error) {
      setMessage('❌ Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };
 
  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newCodigo = [...codigo];
      newCodigo[index] = value;
      setCodigo(newCodigo);
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
                  <form className="Form" onSubmit={handleSubmit}>
                    <div className="code-inputs">
                      {codigo.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          required
                          value={digit}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                      ))}
                    </div>
                    <input
                      type="password"
                      placeholder="Nova senha (mínimo 6 caracteres)"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        margin: '10px 0',
                        border: '1px solid #ddd',
                        borderRadius: '5px'
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Confirmar nova senha"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        margin: '10px 0',
                        border: '1px solid #ddd',
                        borderRadius: '5px'
                      }}
                    />
                    <button type="submit" className="botãoconfirmar" disabled={loading}>
                      {loading ? 'PROCESSANDO...' : 'CONFIRMAR'}
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
 