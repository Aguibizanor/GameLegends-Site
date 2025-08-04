import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import './PaginaPrivacidade.css';
 
const PaginaPrivacidade = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    usuario: ""
  });
 
  useEffect(() => {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setFormData({
        email: usuarioData.email,
        usuario: usuarioData.usuario
      });
    }
  }, []);
 
  const toggleMenu = () => setMenuAberto(!menuAberto);
 
  const buildSection = (title, content) => (
    <div className="privacy-section">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
 
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
            <input required name="q" placeholder="Pesquisar Jogos, Tags ou Criadores" className="input-pesquisa" type="text"/>
            <button className="botao-pesquisa" aria-label="Search">
              <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <div className="painel-usuario">
            {formData.usuario ? (
              <Link to={`/Perfil?tipo=${formData.usuario}`} className="link-usuario">
                <i className="fas fa-user-circle"></i> Perfil ({formData.usuario})
              </Link>
            ) : (
              <>
                <Link to={'/Login'} className="link-usuario">Login</Link>
                <Link to={'/Cadastro'} className="link-usuario">Registre-se</Link>
              </>
            )}
          </div>
        </div>
      </header>
 
      <main className="privacy-main">
        <div className="privacy-box">
          <h1 className="privacy-title">Política de Privacidade</h1>
          <p className="privacy-intro">
            Esta Política de Privacidade descreve como o Game Legends coleta, usa e protege suas informações pessoais.
          </p>
          {buildSection("1. Informações que Coletamos",
            "Coletamos informações que você nos fornece diretamente, como nome, email e dados de perfil quando você se cadastra em nossa plataforma.")}
          {buildSection("2. Como Usamos suas Informações",
            "Utilizamos suas informações para fornecer nossos serviços, melhorar a experiência do usuário e comunicar atualizações importantes.")}
          {buildSection("3. Compartilhamento de Informações",
            "Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros sem seu consentimento explícito.")}
          {buildSection("4. Segurança dos Dados",
            "Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado.")}
          {buildSection("5. Seus Direitos",
            "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento.")}
          {buildSection("6. Contato",
            "Para questões sobre esta política, entre em contato conosco através do email: info@gamelegends.com")}
          <p className="privacy-update">
            Última atualização: Janeiro de 2024
          </p>
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
 
export default PaginaPrivacidade;
 