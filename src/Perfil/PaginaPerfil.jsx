import React, { useState, useEffect } from "react";
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

        console.log("ID do usuário para deletar:", idUsuario);

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

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="pagina-perfil-app">
            <header className="pagina-perfil-cabecalho">
                <div className="pagina-perfil-conteudo-cabecalho">
                    <h1 className="pagina-perfil-logo">
                        <Link to="/" title="Game Legends">
                            <img src={Logo} alt="Logo do Game Legends" />
                        </Link>
                    </h1>
                    <nav className="pagina-perfil-navegacao">
                        <Link to='/Index' className="pagina-perfil-nav-text pagina-perfil-nav-item"><i className="fas fa-home"></i><span className="pagina-perfil-nav-label">Início</span></Link>
                        <Link to='/' className="pagina-perfil-nav-text pagina-perfil-nav-item"><i className="fas fa-gamepad"></i><span className="pagina-perfil-nav-label">Games</span></Link>
                        <Link to='/Que' className="pagina-perfil-nav-text pagina-perfil-nav-item"><i className="fas fa-question-circle"></i><span className="pagina-perfil-nav-label">Sobre</span></Link>
                        <Link to='/Suporte' className="pagina-perfil-nav-text pagina-perfil-nav-item"><i className="fas fa-headset"></i><span className="pagina-perfil-nav-label">Suporte</span></Link>
                    </nav>
                    <button className="pagina-perfil-hamburguer" onClick={() => setMenuAberto(!menuAberto)}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <form className="pagina-perfil-formulario-pesquisa" action="/search">
                        <input required="required" name="q" placeholder="Pesquisar Jogos, Tags ou Criadores" className="pagina-perfil-input-pesquisa" type="text"/>
                        <button className="pagina-perfil-botao-pesquisa" aria-label="Search">
                            <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" className="pagina-perfil-icone-pesquisa" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>
                    <div className="pagina-perfil-painel-usuario">
                        <Link className="pagina-perfil-link-usuario" to="/login">Login</Link>
                        <Link className="pagina-perfil-link-usuario" to="/register">Registre-se</Link>
                    </div>
                </div>
            </header>

            <main className="pagina-perfil-main">
                <div className="pagina-perfil-info-container">
                    <h2 className="pagina-perfil-title">MEU PERFIL</h2>
                    <div className="pagina-perfil-info">
                        <p><strong>Nome:</strong> {formData.nome}</p>
                        <p><strong>CPF:</strong> {formData.cpf}</p>
                        <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Telefone:</strong> {formData.telefone}</p>
                        <p><strong>Tipo</strong> {formData.usuario}</p>
                    </div>
                    <button onClick={handleEdit} className="pagina-perfil-button">Editar Perfil</button>
                    <button onClick={handleDelete} className="pagina-perfil-button pagina-perfil-delete">Excluir Perfil</button>
                </div>

                {modalVisible && (
                    <Modal
                        formData={formData}
                        onClose={() => setModalVisible(false)}
                        onSave={handleSave}
                    />
                )}
            </main>

            <footer className="pagina-perfil-rodape">
                <div className="pagina-perfil-conteudo-rodape">
                    <div className="pagina-perfil-secao-rodape sobre">
                        <h1 className="pagina-perfil-logo-rodape"><span>Game</span>Legends</h1>
                        <p>
                            Game Legends é uma plataforma dedicada a jogos indie, fornecendo uma maneira fácil para desenvolvedores distribuírem seus jogos e para jogadores descobrirem novas experiências.
                        </p>
                        <div className="pagina-perfil-contato-rodape">
                            <span><i className="fas fa-phone"></i> &nbsp; (99) 99999-9999</span>
                            <span><i className="fas fa-envelope"></i> &nbsp; info@gamelegends.com</span>
                        </div>
                        <div className="pagina-perfil-redes-sociais">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                    <div className="pagina-perfil-secao-rodape links">
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
                <div className="pagina-perfil-rodape-inferior">
                    &copy; gamelegends.com | Feito pelo time do Game Legends 
                </div>
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

    useEffect(() => {
        setNome(formData.nome);
        setCpf(formData.cpf);
        setDataNascimento(formData.dataNascimento || "");
        setEmail(formData.email);
        setTelefone(formData.telefone);
    }, [formData]);

    const handleSubmit = () => {
        if (!dataNascimento) {
            alert("A data de nascimento é obrigatória.");
            return;
        } else if (!moment(dataNascimento, 'YYYY-MM-DD', true).isValid()) {
            alert("A data de nascimento está em um formato inválido. Utilize o formato AAAA-MM-DD.");
            return;
        }

        onSave({ nome, cpf, dataNascimento, email, telefone });
    };

    return (
        <div className="pagina-perfil-modal">
            <div className="pagina-perfil-modal-content">
                <h2>Editar Perfil</h2>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>
                <label>
                    CPF:
                    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </label>
                <label>
                    Data de Nascimento:
                    <input type="date" value={dataNascimento || ""} onChange={(e) => setDataNascimento(e.target.value || null)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Telefone:
                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </label>
                <button onClick={handleSubmit}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default PaginaPerfil;