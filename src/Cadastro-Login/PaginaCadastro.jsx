import React, { useState } from "react";
import Logo from "../assets/logo.site.tcc.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './PaginaCadastro.css';

function PaginaCadastro() { 
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: '',
        tipoUsuario: ''
    });

    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Formatação automática do CPF
        if (name === 'cpf') {
            let cpf = value.replace(/\D/g, '').slice(0, 11);
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            setFormData({ ...formData, cpf });
            return;
        }

        // Formatação automática do telefone
        if (name === 'telefone') {
            let telefone = value.replace(/\D/g, '').slice(0, 11);
            telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
            telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
            setFormData({ ...formData, telefone });
            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificação da idade mínima
        const hoje = new Date();
        const dataNascimento = new Date(formData.dataNascimento);
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        if (idade < 16) {
            setMensagem('Você deve ter pelo menos 16 anos para se cadastrar.');
            return;
        }

        // Verificação das senhas
        if (formData.senha !== formData.confirmarSenha) {
            setMensagem('As senhas não correspondem!');
            return;
        }

        // Regex para validar o formato do email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(yahoo|gmail|email)\.com(\.br)?$/;
        if (!emailRegex.test(formData.email)) {
            setMensagem("Formato de email inválido. Use um email válido como yahoo, gmail ou email.");
            return;
        }

        const cadastroData = { ...formData, datanascimento: formData.dataNascimento }; // Prepare os dados para o envio

        try {
            const response = await axios.post('http://localhost:8080/cadastro', cadastroData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) { // Verifica se o cadastro foi bem-sucedido
                alert("Cadastro realizado com sucesso!");
                navigate('/Login'); // Redireciona após sucesso
            } else {
                const errorResponse = response.data;
                setMensagem(errorResponse.message || 'Erro no cadastro.');
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMensagem('Erro ao se conectar ao servidor. Tente novamente.');
        }
    };

    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <div className="pagina-cadastro">
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
            <main className="conteudo-formulario">
                <div className="formulario">
                    <h2 className="titulo-formulario">CRIAR CONTA</h2>
                    <form onSubmit={handleSubmit} className="grade-formulario">
                        <div className="grupo-formulario">
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} className="input-formulario" required />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="sobrenome">Sobrenome:</label>
                            <input type="text" id="sobrenome" name="sobrenome" value={formData.sobrenome} onChange={handleChange} className="input-formulario" required />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="cpf">CPF:</label>
                            <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} className="input-formulario" maxLength="14" required />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="dataNascimento">Data de Nascimento:</label>
                            <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="input-formulario" required />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input-formulario" placeholder="Ex: exemplo@gmail.com" required />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="telefone">Telefone:</label>
                            <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} className="input-formulario" maxLength="15" required />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} className="input-formulario" required />
                        </div>
                        <div className="grupo-formulario">
                            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                            <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} className="input-formulario" required />
                        </div>
                        <div className="tipo-usuario">
                            <label>
                                <input
                                    type="radio"
                                    name="tipoUsuario"
                                    value="cliente"
                                    checked={formData.tipoUsuario === 'cliente'}
                                    onChange={handleChange}
                                />
                                Cliente
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="tipoUsuario"
                                    value="desenvolvedor"
                                    checked={formData.tipoUsuario === 'desenvolvedor'}
                                    onChange={handleChange}
                                />
                                Desenvolvedor
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="tipoUsuario"
                                    value="administrador"
                                    checked={formData.tipoUsuario === 'administrador'}
                                    onChange={handleChange}
                                />
                                Administrador
                            </label>
                        </div>
                        <div className="acoes-formulario">
                            <button type="submit" className="botao-formulario">CADASTRE-SE</button>
                        </div>
                    </form>
                    {mensagem && <div className="mensagem-formulario">{mensagem}</div>}
                    <div className="rodape-formulario">
                        <span>Já tem uma conta? Faça login: <Link to={'/Login'} className="link-formulario">Login</Link></span>
                    </div>
                </div>
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
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
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
}

export default PaginaCadastro;