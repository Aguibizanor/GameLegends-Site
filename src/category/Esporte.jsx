import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
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

    useEffect(() => {
        // Simulação de busca de dados do banco de dados
        fetch('/api/produtos?categoria=esporte')
            .then(response => response.json())
            .then(data => setProdutos(data));
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
                        <a className="link-usuario" href="/Login">Login</a>
                        <a className="link-usuario" href="/Cadastro">Registre-se</a>
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
                                <Link to={'/Terror'}><a href="#"><i className="fas fa-gamepad"></i>Terror</a></Link>
                                <Link to={'/Esporte'}><a href="#"><i className="fas fa-gamepad"></i>Esporte</a></Link>
                                <Link to={'/Aventura'}><a href="#"><i className="fas fa-gamepad"></i>Aventura</a></Link>
                                <Link to={'/Educacional'}><a href="#"><i className="fas fa-gamepad"></i>Educacional</a></Link>
                                <Link to={'/Sobrevivencia'}><a href="#"><i className="fas fa-gamepad"></i>Sobrevivência</a></Link>
                                <Link to={'/Cartas'}><a href="#"><i className="fas fa-gamepad"></i>Jogo de cartas</a></Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('plataformas')}>
                            <span className={`triangulo ${isOpen.plataformas ? 'aberta' : ''}`}></span>
                            Plataformas
                        </h1>
                        {isOpen.plataformas && (
                            <>
                                <Link to={'/Windows'}><a href="#"><i className="fab fa-windows"></i>Windows</a></Link>
                                <Link to={'/MacOs'}><a href="#"><i className="fab fa-apple"></i>Mac OS</a></Link>
                                <Link to={'/Android'}><a href="#"><i className="fab fa-android"></i>Android</a></Link>
                                <Link to={'/iOS'}><a href="#"><i className="fab fa-apple"></i>iOS</a></Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('postagem')}>
                            <span className={`triangulo ${isOpen.postagem ? 'aberta' : ''}`}></span>
                            Postagem
                        </h1>
                        {isOpen.postagem && (
                            <>
                                <Link to={'/Hoje'}><a href="#"><i className="far fa-clock"></i>Hoje</a></Link>
                                <Link to={'/EssaSemana'}><a href="#"><i className="far fa-clock"></i>Essa semana</a></Link>
                                <Link to={'/EsseMes'}><a href="#"><i className="far fa-clock"></i>Esse mês</a></Link>
                            </>
                        )}
                        <h1 onClick={() => toggleList('status')}>
                            <span className={`triangulo ${isOpen.status ? 'aberta' : ''}`}></span>
                            Status
                        </h1>
                        {isOpen.status && (
                            <>
                                <Link to={'/Desenvolvido'}><a href="#"><i className="fas fa-bolt"></i>Desenvolvido</a></Link>
                                <Link to={'/Desenvolvendo'}><a href="#"><i className="fas fa-play"></i>Desenvolvendo</a></Link>
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
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
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
};

export default Esporte;