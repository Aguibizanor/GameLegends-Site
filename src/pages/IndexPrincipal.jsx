import React, { useEffect, useState, useRef } from 'react';
import './IndexPrincipal.css'; // Usar o mesmo CSS para consistência
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import left from "../assets/left.png";
import right from "../assets/right.png";
import shadowdograu from "../assets/shadowdograu.png"; // Importando a nova imagem

const IndexPrincipal = () => {
  const [data, setData] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [isAltered, setIsAltered] = useState(false); // Estado para alternar entre versões
  const [focusedIndex, setFocusedIndex] = useState(null); // Estado para o item focado
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  const [formData, setFormData] = useState({
    email: "",
    usuario: "" // Pode ser "Cliente" ou "Desenvolvedor"
  });
  const carousel = useRef(null);

  useEffect(() => {
    // Carregar dados do carrossel
    fetch('/Carrossel.json')
      .then((response) => response.json())
      .then(setData)
      .catch((error) => console.error('Erro ao carregar os dados:', error));
  }, []);

  useEffect(() => {
    // Verifica se o usuário está logado/cadastrado ao carregar a página
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setFormData({
        email: usuarioData.email,
        usuario: usuarioData.usuario // "Cliente" ou "Desenvolvedor"
      });
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLeftClick = () => {
    const width = carousel.current.clientWidth;
    carousel.current.scrollLeft -= width;
  };

  const handleRightClick = () => {
    const width = carousel.current.clientWidth;
    carousel.current.scrollLeft += width;
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const toggleVersion = () => {
    setIsAltered(!isAltered);
  };

  const handleMouseEnter = (index) => {
    setFocusedIndex(index);
  };

  const handleMouseLeave = () => {
    setFocusedIndex(null);
  };

  if (!data || !data.length) return null;

  return (
    <div className="app">
      {isSearchFocused && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 999
        }} onClick={() => setIsSearchFocused(false)} />
      )}
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </head>
      <header className="cabecalho">
        <div className="conteudo-cabecalho">
          <h1 className="logo">
            <a href="/" title="Game Legends">
              <img src={Logo} alt="Logo do Game Legends" />
            </a>
          </h1>
          <nav className={`navegacao ${menuAberto ? 'ativo' : ''}`}>
            {menuAberto && (
              <form className="formulario-pesquisa" action="/search" style={{
                width: '100%',
                margin: '10px 0',
                padding: '0 20px'
              }}>
                <input 
                  required="required" 
                  name="q" 
                  placeholder="Pesquisar Jogos, Tags ou Criadores" 
                  className="input-pesquisa" 
                  type="text"
                  style={{ width: '100%' }}
                />
                <button className="botao-pesquisa" aria-label="Search">
                  <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </form>
            )}
            <Link to={'/Index'} className="nav-text nav-item"><i className="fas fa-home"></i><span className="nav-label">Início</span></Link>
            <Link to={'/'} className="nav-text nav-item"><i className="fas fa-gamepad"></i><span className="nav-label">Games</span></Link>
            <Link to={'/Que'} className="nav-text nav-item"><i className="fas fa-question-circle"></i><span className="nav-label">Sobre</span></Link>
            <Link to={'/Suporte'} className="nav-text nav-item"><i className="fas fa-headset"></i><span className="nav-label">Suporte</span></Link>
          </nav>
          <button className="hamburguer" onClick={toggleMenu} style={{
            position: menuAberto ? 'fixed' : 'static',
            top: menuAberto ? '195px' : 'auto',
            right: menuAberto ? '20px' : 'auto',
            zIndex: menuAberto ? 100000 : 'auto'
          }}>
            <i className="fas fa-bars"></i>
          </button>
          <form className="formulario-pesquisa" action="/search" style={{
            position: isSearchFocused ? 'relative' : 'static',
            zIndex: isSearchFocused ? 1000 : 'auto',
            boxShadow: isSearchFocused ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
            borderRadius: isSearchFocused ? '8px' : 'initial',
            backgroundColor: isSearchFocused ? 'white' : 'transparent'
          }}>
            <input 
              required="required" 
              name="q" 
              placeholder="Pesquisar Jogos, Tags ou Criadores" 
              className="input-pesquisa" 
              type="text"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button className="botao-pesquisa" aria-label="Search">
              <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <div className="painel-usuario">
            {formData.usuario ? (
              // Exibe o botão "Perfil" com o ícone de perfil e tipo de usuário
              <Link
                to={`/Perfil?tipo=${formData.usuario}`} // Passa o tipo de usuário como parâmetro na URL
                className="link-usuario"
              >
                <i className="fas fa-user-circle"></i> Perfil ({formData.usuario})
              </Link>
            ) : (
              // Exibe os botões "Login" e "Registre-se" se o usuário não estiver logado/cadastrado
              <>
                <Link to={'/Login'} className="link-usuario">Login</Link>
                <Link to={'/Cadastro'} className="link-usuario">Registre-se</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="principal">
        <section className="intro">
          <div className="intro-content">
            <div className="intro-text">
              <h1>EXPLORE O <br /> MUNDO<br /> DOS JOGOS</h1>
              <p>Venha conhecer <br /> nossa plataforma <br />onde você poderá <br />encontrar jogos <br /> da nossa comunidade.</p>
              <Link to={'/'}><button className="cta-button">Conheça <i className="fas fa-arrow-circle-right"></i></button></Link>
            </div>
            <div className="intro-image shadowdograu">
              <img src={shadowdograu} alt="Imagem de exemplo" />
            </div>
          </div>
        </section>
        <section>
          <div className="carrossel-container">
            <button className="left" onClick={handleLeftClick}><img src={left} alt="esquerda" /></button>
            <div className="carrossel" ref={carousel}>
              {data.map((item, index) => {
                const { id, name, descricao, imagem } = item;
                const isFocused = index === focusedIndex;
                return (
                  <div
                    className={`item ${isFocused ? 'focused' : ''}`}
                    key={id}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="imag">
                      <img src={imagem} alt={name} />
                    </div>
                    <div className="info">
                      <span className="name">{name}</span>
                      <span className="texto">{descricao}</span>
                      <Link to={`/Descricao/${id}`}><span className="butao">Veja Mais <i className="fas fa-arrow-circle-right"></i></span></Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="right" onClick={handleRightClick}><img src={right} alt="direita" /></button>
          </div>
        </section>
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

export default IndexPrincipal;