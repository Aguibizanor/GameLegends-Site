import React, { useState, useEffect } from "react";
import './PaginaCriarProjeto.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Logo from "../assets/logo.site.tcc.png";

function PaginaCriarProjeto() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    usuario: ""
  });

  const [nomeProjeto, setNomeProjeto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [tecnologias, setTecnologias] = useState("");
  const [genero, setGenero] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setFormData({
        email: usuarioData.email,
        usuario: usuarioData.usuario
      });
    }
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nomeProjeto || !descricao || !dataInicio || !tecnologias || !genero) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setError("");
    const projetoData = {
      nomeProjeto,
      descricao,
      dataInicio,
      tecnologias,
      genero,
      image: image.split(",")[1] // Remove o prefixo "data:image/png;base64," para enviar apenas o Base64
    };

    try {
      const response = await axios.post('http://localhost:8080/projetos', projetoData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) { // Verifica se o cadastro foi bem-sucedido
        alert("Projeto criado com sucesso!");
        setSuccessMessage("Projeto criado com sucesso!");
        setNomeProjeto("");
        setDescricao("");
        setDataInicio("");
        setTecnologias("");
        setGenero("");
        setImage("");
        navigate('/Perfil'); // Redireciona para a página de perfil
      } else {
        const errorResponse = response.data;
        setError(errorResponse.message || 'Erro ao criar projeto.');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      if (error.response) {
        // Erro vindo do servidor
        console.error("Resposta do servidor:", error.response);
        setError(error.response.data.message || 'Erro no servidor. Tente novamente.');
      } else if (error.request) {
        // Erro na conexão com o servidor
        console.error("Nenhuma resposta recebida do servidor:", error.request);
        setError('Erro ao se conectar ao servidor. Verifique sua conexão.');
      } else {
        // Outro tipo de erro
        console.error("Erro desconhecido:", error.message);
        setError('Erro desconhecido. Tente novamente mais tarde.');
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="pagina-criar-projeto-app">
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
              <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="icone-pesquisa" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <div className="painel-usuario">
            {formData.usuario ? (
              <Link to={`/Perfil?tipo=${formData.usuario}`} className="link-usuario">
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

      <main className="pagina-criar-projeto-main">
        <div className="pagina-criar-projeto-container">
          <div className="pagina-criar-projeto-title">
            <h1>Criar Meu Projeto</h1>
          </div>
          <form onSubmit={handleSubmit} className="pagina-criar-projeto-form">
            {/* Campos do formulário */}
            <div className="pagina-criar-projeto-field">
              <label>Selecionar Imagem:</label>
              <div className="pagina-criar-projeto-image-upload-wrapper">
                <button type="button" onClick={handleButtonClick} className="pagina-criar-projeto-button">Selecionar Imagem</button>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                {image && (
                  <div className="pagina-criar-projeto-image-preview">
                    <img src={image} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
            <div className="pagina-criar-projeto-field">
              <label>Nome do Projeto:</label>
              <input
                type="text"
                value={nomeProjeto}
                onChange={(e) => setNomeProjeto(e.target.value)}
                className="pagina-criar-projeto-input"
              />
            </div>
            <div className="pagina-criar-projeto-field">
              <label>Descrição:</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="pagina-criar-projeto-input"
              />
            </div>
            <div className="pagina-criar-projeto-field">
              <label>Data de Início:</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="pagina-criar-projeto-input"
              />
            </div>
            <div className="pagina-criar-projeto-field">
              <label>Contato:</label>
              <input
                type="text"
                value={tecnologias}
                onChange={(e) => setTecnologias(e.target.value)}
                className="pagina-criar-projeto-input"
                placeholder="Ex: Instagram, email"
              />
            </div>
            <div className="pagina-criar-projeto-field">
              <label>Gênero do Jogo:</label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="pagina-criar-projeto-input"
              >
                <option value="">Selecione um gênero</option>
                <option value="Android">Android</option>
                <option value="Aventura">Aventura</option>
                <option value="Cartas">Cartas</option>
                <option value="Educacional">Educacional</option>
                <option value="Esporte">Esporte</option>
                <option value="iOs">iOs</option>
                <option value="MacOs">MacOs</option>
                <option value="Sobrevivência">Sobrevivência</option>
                <option value="Terror">Terror</option>
                <option value="Windows">Windows</option>
              </select>
            </div>
            {error && <div className="pagina-criar-projeto-error">{error}</div>}
            {successMessage && <div className="pagina-criar-projeto-mensagem sucesso">{successMessage}</div>}
            <button type="submit" className="pagina-criar-projeto-button">Criar Projeto</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default PaginaCriarProjeto;