import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import galho from '../assets/galho.png';
import gladiator from '../assets/gladiator.png';
import pombo from '../assets/pombo.png';
import img06 from '../assets/img06.png';
import salada from '../assets/salada.png';
import mirror from '../assets/mirror.png';
import "../Pages/PaginaInicial.css";
 
const Desenvolvido = () => {
    const [isOpen, setIsOpen] = useState({
        genero: true,
        plataformas: true,
        postagem: true,
        status: true,
    });
 
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
    const [formData, setFormData] = useState({
        email: "",
        usuario: "" // Pode ser "Cliente" ou "Desenvolvedor"
      });
 
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Simulação de busca de dados do banco de dados
        fetch('/api/produtos?status=desenvolvido')
            .then(response => response.json())
            .then(data => setProdutos(data));
    // Verifica se o usuário está logado/cadastrado ao carregar a página
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
        setFormData({
            email: usuarioData.email,
            usuario: usuarioData.usuario // "Cliente" ou "Desenvolvedor"
          });
        }
      }, []);
 
    const toggleList = (section) => {
        setIsOpen({ ...isOpen, [section]: !isOpen[section] });
    };
 
    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };
 
    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };
 
    return (
        <div className="app">
            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
            </head>
            <header className="cabecalho">
                <div className="conteudo-cabecalho">
                    <h1 className="logo">
                        <a href="/Index" title="Game Legends">
                            <img src={Logo} alt="Logo do Game Legends" />
                        </a>
                    </h1>
                    <nav className={`navegacao ${menuAberto ? 'ativo' : ''}`}>
                        <Link to={'/'} className="nav-text nav-item"><i className="fas fa-home"></i><span className="nav-label">Início</span></Link>
                        <Link to={'/Inicial'} className="nav-text nav-item"><i className="fas fa-gamepad"></i><span className="nav-label">Games</span></Link>
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
                <button className={`hamburguer-principal ${isMobileOpen ? 'aberto' : ''}`} onClick={toggleMobileMenu}>
                    <i className={`fas ${isMobileOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                </button>
                <section className={`barra-lateral ${isMobileOpen ? 'aberta' : ''}`}>
                    <div>
                        <h1 onClick={() => toggleList('genero')}>
                            <span className={`triangulo ${isOpen.genero ? 'aberta' : ''}`}></span>
                            Gênero
                        </h1>
                        {isOpen.genero && (
                            <>
                                <Link to={'/Terror'}><i className="fas fa-gamepad"></i>Terror</Link>
                                <Link to={'/Esporte'}><i className="fas fa-gamepad"></i>Esporte</Link>
                                <Link to={'/Aventura'}><i className="fas fa-gamepad"></i>Aventura</Link>
                                <Link to={'/Educacional'}><i className="fas fa-gamepad"></i>Educacional</Link>
                                <Link to={'/Sobrevivencia'}><i className="fas fa-gamepad"></i>Sobrevivência</Link>
                                <Link to={'/Cartas'}><i className="fas fa-gamepad"></i>Jogo de cartas</Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('plataformas')}>
                            <span className={`triangulo ${isOpen.plataformas ? 'aberta' : ''}`}></span>
                            Plataformas
                        </h1>
                        {isOpen.plataformas && (
                            <>
                                <Link to={'/Windows'}><i className="fab fa-windows"></i>Windows</Link>
                                <Link to={'/MacOs'}><i className="fab fa-apple"></i>Mac OS</Link>
                                <Link to={'/Android'}><i className="fab fa-android"></i>Android</Link>
                                <Link to={'/iOS'}><i className="fab fa-apple"></i>iOS</Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('postagem')}>
                            <span className={`triangulo ${isOpen.postagem ? 'aberta' : ''}`}></span>
                            Postagem
                        </h1>
                        {isOpen.postagem && (
                            <>
                                <Link to={'/Hoje'}><i className="far fa-clock"></i>Hoje</Link>
                                <Link to={'/EssaSemana'}><i className="far fa-clock"></i>Essa semana</Link>
                                <Link to={'/EsseMes'}><i className="far fa-clock"></i>Esse mês</Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('status')}>
                            <span className={`triangulo ${isOpen.status ? 'aberta' : ''}`}></span>
                            Status
                        </h1>
                        {isOpen.status && (
                            <>
                                <Link to={'/Desenvolvido'}><i className="fas fa-bolt"></i>Desenvolvido</Link>
                                <Link to={'/Desenvolvendo'}><i className="fas fa-play"></i>Desenvolvendo</Link>
                            </>
                        )}
                    </div>
                </section>
                <section className="secao-jogos">
                    {produtos.map(produto => (
                        <Link to={`/Descricao/${produto.id}`} key={produto.id}>
                            <div className="jogo-card">
                                <img src={produto.imagem} alt={produto.nome} />
                                <a href="#">{produto.nome}</a>
                            </div>
                        </Link>
                    ))}
                </section>
                <section className="games-section" style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                    gap: '40px',
                    padding: '50px',
                    justifyItems: 'center',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '50px auto',
                    backgroundColor: 'transparent',
                    borderRadius: '20px'
                }}>
                    <div className="game-card" style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#e6d7ff',
                        padding: isMobile ? '15px 25px' : (isTablet ? '18px 22px' : '20px'),
                        borderRadius: '15px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}>
                        <img src={galho} alt="Inmost" style={{ width: isMobile ? '220px' : (isTablet ? '260px' : '320px'), height: isMobile ? '170px' : (isTablet ? '200px' : '320px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Inmost</a></div>
                        <button style={{
                            backgroundColor: '#90017F',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>Veja Mais</button>
                    </div>
                    <div className="game-card" style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#e6d7ff',
                        padding: isMobile ? '15px 25px' : (isTablet ? '18px 22px' : '20px'),
                        borderRadius: '15px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}>
                        <img src={gladiator} alt="Gladiator" style={{ width: isMobile ? '180px' : (isTablet ? '220px' : '280px'), height: isMobile ? '140px' : (isTablet ? '170px' : '280px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Gladiator</a></div>
                        <button style={{
                            backgroundColor: '#90017F',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>Veja Mais</button>
                    </div>
                    <div className="game-card" style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#e6d7ff',
                        padding: isMobile ? '15px 25px' : (isTablet ? '18px 22px' : '20px'),
                        borderRadius: '15px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}>
                        <img src={pombo} alt="Subida de Pomba" style={{ width: isMobile ? '180px' : (isTablet ? '220px' : '280px'), height: isMobile ? '140px' : (isTablet ? '170px' : '280px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Subida de Pomba</a></div>
                        <button style={{
                            backgroundColor: '#90017F',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>Veja Mais</button>
                    </div>
                    <div className="game-card" style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#e6d7ff',
                        padding: isMobile ? '15px 25px' : (isTablet ? '18px 22px' : '20px'),
                        borderRadius: '15px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}>
                        <img src={img06} alt="Face Down" style={{ width: isMobile ? '180px' : (isTablet ? '220px' : '280px'), height: isMobile ? '140px' : (isTablet ? '170px' : '280px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Face Down</a></div>
                        <button style={{
                            backgroundColor: '#90017F',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>Veja Mais</button>
                    </div>
                    <div className="game-card" style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#e6d7ff',
                        padding: isMobile ? '15px 25px' : (isTablet ? '18px 22px' : '20px'),
                        borderRadius: '15px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}>
                        <img src={salada} alt="They Are Here" style={{ width: isMobile ? '180px' : (isTablet ? '220px' : '280px'), height: isMobile ? '140px' : (isTablet ? '170px' : '280px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">They Are Here</a></div>
                        <button style={{
                            backgroundColor: '#90017F',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>Veja Mais</button>
                    </div>
                    <div className="game-card" style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#e6d7ff',
                        padding: isMobile ? '15px 25px' : (isTablet ? '18px 22px' : '20px'),
                        borderRadius: '15px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}>
                        <img src={mirror} alt="Pocket Mirror" style={{ width: isMobile ? '180px' : (isTablet ? '220px' : '280px'), height: isMobile ? '140px' : (isTablet ? '170px' : '280px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Pocket Mirror</a></div>
                        <button style={{
                            backgroundColor: '#90017F',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>Veja Mais</button>
                    </div>
                </section>
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
              <a href="#"
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
 
export default Desenvolvido;
 

