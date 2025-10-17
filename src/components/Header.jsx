import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import './Header.css';

const Header = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        usuario: "",
        nome: "",
        tipoUsuario: ""
    });

    useEffect(() => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioData) {
            setFormData({
                email: usuarioData.email,
                usuario: usuarioData.usuario,
                nome: usuarioData.nome,
                tipoUsuario: usuarioData.tipoUsuario
            });
        }
    }, []);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <>
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
            <header className="cabecalho">
                <div className="conteudo-cabecalho">
                    <h1 className="logo">
                        <Link to="/Index" title="Game Legends">
                            <img src={Logo} alt="Logo do Game Legends" />
                        </Link>
                    </h1>
                    <nav className={`navegacao ${menuAberto ? 'ativo' : ''}`}>
                        <Link to={'/Index'} className="nav-text nav-item">
                            <i className="fas fa-home"></i>
                            <span className="nav-label">Início</span>
                        </Link>
                        <Link to={'/Games'} className="nav-text nav-item">
                            <i className="fas fa-gamepad"></i>
                            <span className="nav-label">Games</span>
                        </Link>
                        <Link to={'/Que'} className="nav-text nav-item">
                            <i className="fas fa-question-circle"></i>
                            <span className="nav-label">Sobre</span>
                        </Link>
                        <Link to={'/Suporte'} className="nav-text nav-item">
                            <i className="fas fa-headset"></i>
                            <span className="nav-label">Suporte</span>
                        </Link>
                    </nav>
                    <button className="hamburguer" onClick={toggleMenu}>
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
                    <form className="formulario-pesquisa-mobile" action="/search">
                        <input required="required" name="q" placeholder="Pesquisar" className="input-pesquisa-mobile" type="text" />
                        <button className="botao-pesquisa-mobile" aria-label="Search">
                            <svg version="1.1" width="16" height="16" role="img" viewBox="0 0 24 24" aria-hidden="true" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>
                    <div className="painel-usuario">
                        {formData.tipoUsuario ? (
                            <Link
                                to={`/Perfil?tipo=${formData.tipoUsuario}`}
                                className="link-usuario"
                            >
                                <i className="fas fa-user-circle"></i> Perfil ({formData.nome?.split(' ')[0] || formData.tipoUsuario})
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
        </>
    );
};

export default Header;
