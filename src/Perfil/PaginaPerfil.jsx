import React, { useEffect, useState } from "react";
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
                    <Link to="/" className="pagina-perfil-logo"><img src={Logo} alt="Logo do Game Legends" /></Link>
                    <nav className="pagina-perfil-navegacao">
                        <Link to='/Index' className="pagina-perfil-nav-item">Início</Link>
                        <Link to='/' className="pagina-perfil-nav-item">Games</Link>
                        <Link to='/Suporte' className="pagina-perfil-nav-item">Suporte</Link>
                    </nav>
                    <div className="pagina-perfil-perfil-btn">
                        <Link to='/Perfil'><i className="pagina-perfil-icon" />Perfil</Link>
                    </div>
                </div>
                <div className="pagina-perfil-search-box">
                    <input type="text" placeholder="Search..." />
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
 
            <footer className="pagina-perfil-rodape">
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
 