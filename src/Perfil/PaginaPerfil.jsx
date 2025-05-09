import React, { useEffect, useState, useRef } from "react";
import './PaginaPerfil.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import moment from "moment";

function PaginaPerfil() {
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        dataNascimento: null,
        email: "",
        telefone: "",
        usuario: ""
    });
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioData) {
            setFormData({
                nome: usuarioData.nome,
                cpf: usuarioData.cpf,
                dataNascimento: usuarioData.datanascimento,
                email: usuarioData.email,
                telefone: usuarioData.telefone,
                usuario: usuarioData.usuario
            });
            setLoading(false);
        } else {
            navigate('/Login');
        }
    }, [navigate]);

    const handleDelete = () => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));
        const idUsuario = usuarioData?.id;

        if (!idUsuario) {
            alert("Erro: ID do usuário não encontrado.");
            return;
        }

        if (window.confirm("Tem certeza que deseja excluir seu perfil?")) {
            fetch(`http://localhost:8080/cadastro/${idUsuario}`, {
                method: "DELETE",
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao deletar o perfil.");
                    }
                    alert("Perfil deletado com sucesso!");
                    localStorage.removeItem('usuario');
                    navigate('/Login');
                })
                .catch(error => {
                    console.error("Erro ao deletar o perfil:", error);
                    alert("Erro ao deletar o perfil: " + error.message);
                });
        }
    };

    const handleEdit = () => {
        setModalVisible(true);
    };

    const handleSave = (updatedData) => {
        const usuarioData = JSON.parse(localStorage.getItem('usuario'));

        fetch(`http://localhost:8080/cadastro`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...usuarioData,
                ...updatedData,
                dataNascimento: updatedData.dataNascimento || null
            }),
        })
            .then(response => response.json())
            .then(() => {
                const updatedUserData = {
                    ...usuarioData,
                    ...updatedData,
                };
                setFormData(updatedUserData);
                localStorage.setItem('usuario', JSON.stringify(updatedUserData));
                alert("Perfil atualizado com sucesso!");
                setModalVisible(false);
            })
            .catch(error => {
                console.error("Erro ao atualizar o perfil:", error);
                alert("Erro ao atualizar o perfil.");
            });
    };

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="pagina-perfil-app">
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

            <main className="pagina-perfil-main">
                <div className="pagina-perfil-container">
                    <div className="pagina-perfil-avatar"></div>
                    <div className="pagina-perfil-info">
                        <p><strong>Nome:</strong> {formData.nome}</p>
                        <p><strong>CPF:</strong> {formData.cpf}</p>
                        <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Telefone:</strong> {formData.telefone}</p>
                        <p><strong>Tipo de Usuário:</strong> {formData.usuario}</p>
                        <button onClick={handleEdit}>Editar Perfil</button>
                        {formData.usuario === "Desenvolvedor" && <Link to="/Criar">+ Criar Novo Jogo</Link>}
                        <button onClick={handleDelete} className="pagina-perfil-delete">Excluir Perfil</button>
                    </div>
                </div>

                {modalVisible && <Modal formData={formData} onClose={() => setModalVisible(false)} onSave={handleSave} />}
            </main>

            <footer className="rodape">
                <div className="conteudo-rodape">
                    <div className="secao-rodape sobre">
                        <h1 className="logo-rodape"><span>Game</span>Legends</h1>
                        <p>
                            Game Legends é uma plataforma dedicada a jogos indie, fornecendo uma maneira fácil para desenvolvedores distribuírem seus jogos e para jogadores descobrirem novas experiências.
                        </p>
                    </div>
                </div>
                <p>&copy; 2025 Game Legends. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

const Modal = ({ formData, onClose, onSave }) => {
    const [nome, setNome] = useState(formData.nome);
    const [cpf, setCpf] = useState(formData.cpf);
    const [dataNascimento, setDataNascimento] = useState(formData.dataNascimento || "");
    const [email, setEmail] = useState(formData.email);
    const [telefone, setTelefone] = useState(formData.telefone);

    const handleSubmit = () => {
        if (!dataNascimento || !moment(dataNascimento, 'YYYY-MM-DD', true).isValid()) {
            alert("A data de nascimento é obrigatória e deve estar no formato AAAA-MM-DD.");
            return;
        }
        onSave({ nome, cpf, dataNascimento, email, telefone });
    };

    return (
        <div className="pagina-perfil-modal">
            <div className="pagina-perfil-modal-content">
                <h2>Editar Perfil</h2>
                <label>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /></label>
                <label>CPF: <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} /></label>
                <label>Data de Nascimento: <input type="date" value={dataNascimento || ""} onChange={(e) => setDataNascimento(e.target.value)} /></label>
                <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                <label>Telefone: <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} /></label>
                <button onClick={handleSubmit}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default PaginaPerfil;