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
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
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
 
    const handleLogout = () => {
        if (window.confirm("Tem certeza que deseja sair da sua conta?")) {
            localStorage.removeItem('usuario');
            alert("Logout realizado com sucesso!");
            navigate('/Login');
        }
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
 
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
 
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
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
                                <i className="fas fa-user-circle"></i> Perfil ({formData.nome?.split(' ')[0] || formData.usuario})
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
                    <div className="profile-header">
                        <div className="pagina-perfil-avatar" onClick={handleImageClick}>
                            {profileImage ? (
                                <img src={profileImage} alt="Foto de perfil" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    {formData.nome ? formData.nome.charAt(0).toUpperCase() : 'U'}
                                </div>
                            )}
                            <div className="camera-icon">
                                <i className="fas fa-camera"></i>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{display: 'none'}}
                        />
                        <div className="profile-name">{formData.nome}</div>
                        <div className="profile-email">
                            <i className="fas fa-envelope"></i>
                            {formData.email}
                        </div>
                    </div>
                   
                    <div className="profile-info-section">
                        <div className="info-item">
                            <div className="info-icon" style={{backgroundColor: '#90017F'}}>
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="info-content">
                                <div className="info-label">Nome Completo</div>
                                <div className="info-value">{formData.nome}</div>
                            </div>
                        </div>
                       
                        <div className="info-item">
                            <div className="info-icon" style={{backgroundColor: '#FF6B6B'}}>
                                <i className="fas fa-id-card"></i>
                            </div>
                            <div className="info-content">
                                <div className="info-label">CPF</div>
                                <div className="info-value">{formData.cpf}</div>
                            </div>
                        </div>
                       
                        <div className="info-item">
                            <div className="info-icon" style={{backgroundColor: '#4ECDC4'}}>
                                <i className="fas fa-birthday-cake"></i>
                            </div>
                            <div className="info-content">
                                <div className="info-label">Data de Nascimento</div>
                                <div className="info-value">{formData.dataNascimento}</div>
                            </div>
                        </div>
                       
                        <div className="info-item">
                            <div className="info-icon" style={{backgroundColor: '#45B7D1'}}>
                                <i className="fas fa-phone"></i>
                            </div>
                            <div className="info-content">
                                <div className="info-label">Telefone</div>
                                <div className="info-value">{formData.telefone}</div>
                            </div>
                        </div>
                       
                        <div className="info-item">
                            <div className="info-icon" style={{backgroundColor: '#96CEB4'}}>
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="info-content">
                                <div className="info-label">Senha</div>
                                <div className="info-value">••••••••</div>
                            </div>
                        </div>
                       
                        <div className="action-buttons">
                            <button onClick={handleEdit} style={{
                                backgroundColor: '#90017F',
                                color: 'white',
                                border: 'none',
                                padding: '15px 25px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(144, 1, 127, 0.3)'
                            }}>✏️ Editar Perfil</button>
                           
                            {formData.usuario === "Desenvolvedor" &&
                                <Link to="/Criar" style={{
                                    backgroundColor: '#00c853',
                                    color: 'white',
                                    textDecoration: 'none',
                                    padding: '15px 25px',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    display: 'block',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(0, 200, 83, 0.3)'
                                }}>🎮 Criar Novo Jogo</Link>
                            }
                           
                            <button onClick={handleLogout} style={{
                                backgroundColor: '#FF9800',
                                color: 'white',
                                border: 'none',
                                padding: '15px 25px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)'
                            }}>🚪 Sair da Conta</button>
                           
                            <button onClick={handleDelete} style={{
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                padding: '15px 25px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)'
                            }}>🗑️ Excluir Perfil</button>
                        </div>
                    </div>
                </div>
 
                {modalVisible && <Modal formData={formData} onClose={() => setModalVisible(false)} onSave={handleSave} />}
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
                            <a href="https://www.reddit.com/r/Game_Legends_jogos/s/GZVUlKiWg8"
                               target="_blank"
                               rel="noopener noreferrer"
                               style={{
                                   backgroundColor: '#FF6B6B',
                                   borderRadius: '50%',
                                   width: '50px',
                                   height: '50px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   textDecoration: 'none'
                               }}>
                                <i className="fab fa-reddit" style={{ color: 'white', fontSize: '20px' }}></i>
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
}
 
const Modal = ({ formData, onClose, onSave }) => {
    const [nome, setNome] = useState(formData.nome);
    const [cpf, setCpf] = useState(formData.cpf);
    const [dataNascimento, setDataNascimento] = useState(formData.dataNascimento || "");
    const [email, setEmail] = useState(formData.email);
    const [telefone, setTelefone] = useState(formData.telefone);
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
 
    const handleSubmit = () => {
        if (!dataNascimento || !moment(dataNascimento, 'YYYY-MM-DD', true).isValid()) {
            alert("A data de nascimento é obrigatória e deve estar no formato AAAA-MM-DD.");
            return;
        }
       
        if (senha && senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }
       
        const updateData = { nome, cpf, dataNascimento, email, telefone };
        if (senha) {
            updateData.senha = senha;
        }
       
        onSave(updateData);
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
                <label>Nova Senha (opcional): <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Deixe em branco para manter a atual" /></label>
                <label>Confirmar Nova Senha: <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} placeholder="Confirme a nova senha" disabled={!senha} /></label>
                <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                    <button onClick={handleSubmit} style={{backgroundColor: '#90017F', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1}}>Salvar</button>
                    <button onClick={onClose} style={{backgroundColor: '#666', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1}}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};
 
export default PaginaPerfil;
 
 