import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import "./PaginaInicial.css";

const PaginaInicial = () => {
    const [isOpen, setIsOpen] = useState({
        genero: true,
        plataformas: true,
        postagem: true,
        status: true,
    });

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);
    const [projetos, setProjetos] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        usuario: "" // Pode ser "Cliente" ou "Desenvolvedor"
    });

    useEffect(() => {
        // Fetch projects from API
        fetch('http://localhost:8080/projetos')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar projetos: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Projetos carregados:', data);
                setProjetos(data || []);
            })
            .catch(error => {
                console.error("Erro ao carregar projetos:", error);
                setProjetos([]);
            });

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

    // Função utilitária para obter a URL da imagem do projeto (retorna endpoint de bytes)
    const getProjetoImagem = (projeto) => {
        // Sempre retorna o endpoint que serve o byte[] convertido em imagem
        return `http://localhost:8080/projetos/${projeto.id}/foto`;
    };

    return (
        <div className="app">
            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
            </head>
            <header className="cabecalho">
                <div className="conteudo-cabecalho">
                    <h1 className={`logo ${menuAberto ? 'escondida' : ''}`}>
                        <a href="/Index" title="Game Legends">
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
                        <input required="required" name="q" placeholder="Pesquisar Jogos, Tags ou Criadores" className="input-pesquisa" type="text" />
                        <button className="botao-pesquisa" aria-label="Search">
                            <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>
                    <div className="painel-usuario">
                        {formData.usuario ? (
                            <Link
                                to={`/Perfil?tipo=${formData.usuario}`}
                                className="link-usuario"
                            >
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
                                <Link to={'/Terror'}><i className="fas fa-gamepad"></i> Terror</Link>
                                <Link to={'/Esporte'}><i className="fas fa-gamepad"></i> Esporte</Link>
                                <Link to={'/Aventura'}><i className="fas fa-gamepad"></i> Aventura</Link>
                                <Link to={'/Educacional'}><i className="fas fa-gamepad"></i> Educacional</Link>
                                <Link to={'/Sobrevivencia'}><i className="fas fa-gamepad"></i> Sobrevivência</Link>
                                <Link to={'/Cartas'}><i className="fas fa-gamepad"></i> Jogo de cartas</Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('plataformas')}>
                            <span className={`triangulo ${isOpen.plataformas ? 'aberta' : ''}`}></span>
                            Plataformas
                        </h1>
                        {isOpen.plataformas && (
                            <>
                                <Link to={'/Windows'}><i className="fab fa-windows"></i> Windows</Link>
                                <Link to={'/MacOs'}><i className="fab fa-apple"></i> Mac OS</Link>
                                <Link to={'/Android'}><i className="fab fa-android"></i> Android</Link>
                                <Link to={'/iOS'}><i className="fab fa-apple"></i> iOS</Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('postagem')}>
                            <span className={`triangulo ${isOpen.postagem ? 'aberta' : ''}`}></span>
                            Postagem
                        </h1>
                        {isOpen.postagem && (
                            <>
                                <Link to={'/Hoje'}><i className="far fa-clock"></i> Hoje</Link>
                                <Link to={'/EssaSemana'}><i className="far fa-clock"></i> Essa semana</Link>
                                <Link to={'/EsseMes'}><i className="far fa-clock"></i> Esse mês</Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('status')}>
                            <span className={`triangulo ${isOpen.status ? 'aberta' : ''}`}></span>
                            Status
                        </h1>
                        {isOpen.status && (
                            <>
                                <Link to={'/Desenvolvido'}><i className="fas fa-bolt"></i> Desenvolvido</Link>
                                <Link to={'/Desenvolvendo'}><i className="fas fa-play"></i> Desenvolvendo</Link>
                            </>
                        )}
                    </div>
                </section>
                <section className="games-section">
                    {projetos.map(projeto => (
                        <Link key={projeto.id} to={`/Descricao/${projeto.id}`} className="game-card-link">
                            <div className="game-card">
                                {getProjetoImagem(projeto) ? (
                                    <img src={getProjetoImagem(projeto)} alt={projeto.nomeProjeto} />
                                ) : (
                                    <div className="no-image">sem imagem</div>
                                )}
                                <h3>{projeto.nomeProjeto}</h3>
                                <p className="game-description">{projeto.descricao}</p>
                            </div>
                        </Link>
                    ))}
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

export default PaginaInicial;

