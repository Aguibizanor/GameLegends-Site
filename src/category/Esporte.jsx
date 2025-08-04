import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import siriguela from '../assets/siriguela.png';
import roma from '../assets/roma.png';
import pera from '../assets/pera.png';
import mamao from '../assets/mamao.png';
import manga from '../assets/manga.png';
import morango from '../assets/morango.png';
import "../Pages/PaginaInicial.css"
 
const Esporte = () => {
    const [isOpen, setIsOpen] = useState({
        genero: true,
        plataformas: true,
        postagem: true,
        status: true,
    });
 
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        usuario: "" // Pode ser "Cliente" ou "Desenvolvedor"
      });
 
    useEffect(() => {
        // Simulação de busca de dados do banco de dados
        fetch('/api/produtos?categoria=esporte')
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
                        <a href="/" title="Game Legends">
                            <img src={Logo} alt="Logo do Game Legends" />
                        </a>
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
                <section className="games-section" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '50px',
                    padding: '80px',
                    justifyItems: 'center',
                    alignItems: 'center',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <div className="game-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={siriguela} alt="Wheelchair Basktball" style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Wheelchair Basktball</a></div>
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
                    <div className="game-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={roma} alt="Cage fight" style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Cage fight</a></div>
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
                    <div className="game-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={pera} alt="College Slam" style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">College Slam</a></div>
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
                    <div className="game-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={mamao} alt="Football Drama" style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Football Drama</a></div>
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
                    <div className="game-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={manga} alt="Skatebird" style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Skatebird</a></div>
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
                    <div className="game-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={morango} alt="Super video Golf" style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '15px' }} />
                        <div style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold' }}><a href="">Super video Golf</a></div>
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
 
export default Esporte;
 