import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import gold from '../assets/gold.png';
import self from '../assets/self.png';
import kiddo from '../assets/kiddo.png';
import kama from '../assets/kama.png';
import "../Pages/PaginaInicial.css"
import "./category-styles.css"
 
const Hoje = () => {
    const [isOpen, setIsOpen] = useState({
        genero: true,
        plataformas: true,
        postagem: true,
        status: true,
    });
 
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
 
    useEffect(() => {
        fetch('/api/produtos?data=hoje')
            .then(response => response.json())
            .then(data => setProdutos(data));

      }, []);
 
    const toggleList = (section) => {
        setIsOpen({ ...isOpen, [section]: !isOpen[section] });
    };
 

 
    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };
 
    return (
        <div className="app">
            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
            </head>
            <Header />
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
                        <img src={gold} alt="Gold of skils" style={{ width: isMobile ? '220px' : (isTablet ? '260px' : '320px'), height: isMobile ? '170px' : (isTablet ? '200px' : '320px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Gold of skils</a></div>
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
                        <img src={self} alt="Self Redemption of mental" style={{ width: isMobile ? '180px' : (isTablet ? '220px' : '280px'), height: isMobile ? '140px' : (isTablet ? '170px' : '280px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Self Redemption of mental</a></div>
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
                        <img src={kiddo} alt="Kiddo" style={{ width: isMobile ? '180px' : (isTablet ? '220px' : '280px'), height: isMobile ? '140px' : (isTablet ? '170px' : '280px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Kiddo</a></div>
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
                        <img src={kama} alt="Kamaeru" style={{ width: isMobile ? '180px' : (isTablet ? '220px' : '280px'), height: isMobile ? '140px' : (isTablet ? '170px' : '280px'), objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Kamaeru</a></div>
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
            <footer style={{ backgroundColor: '#90017F', padding: '40px 20px', marginTop: '0px' }}>
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
 
export default Hoje;
 

