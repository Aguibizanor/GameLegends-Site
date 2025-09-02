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

  // Alinhamento com o banco:
  // nomeProjeto, descricao, dataInicio, tecnologias, genero, foto (byte[])
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [tecnologias, setTecnologias] = useState("");
  const [genero, setGenero] = useState("");
  const [fotoPreview, setFotoPreview] = useState(""); // Para preview no front
  const [fotoFile, setFotoFile] = useState(null);      // Para envio ao backend
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setError("Por favor, selecione um arquivo de imagem válido (JPEG, PNG, etc).");
        return;
      }
      setFotoFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target.result === 'string' && e.target.result.startsWith('data:')) {
          setFotoPreview(e.target.result);
          setError("");
        } else {
          setError("Formato de imagem não suportado.");
        }
      };
      reader.onerror = () => {
        setError("Erro ao ler o arquivo de imagem. Tente novamente.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nomeProjeto || !descricao || !dataInicio || !tecnologias || !genero) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!formData.usuario || !formData.email) {
      setError("Você precisa estar logado para criar um projeto. Faça login e tente novamente.");
      return;
    }

    setError("");
    setSuccessMessage("");

    // Alinhamento dos campos com o banco:
    const form = new FormData();
    form.append("nomeProjeto", nomeProjeto); // String
    form.append("descricao", descricao);     // String
    form.append("dataInicio", dataInicio);   // String
    form.append("tecnologias", tecnologias); // String
    form.append("genero", genero);           // String
    if (fotoFile) {
      form.append("foto", fotoFile);         // byte[] no backend
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/projetos/createComFoto",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setSuccessMessage("Projeto criado com sucesso! Criação do projeto concluída.");
        setNomeProjeto("");
        setDescricao("");
        setDataInicio("");
        setTecnologias("");
        setGenero("");
        setFotoPreview("");
        setFotoFile(null);
      } else {
        setError(`Resposta inesperada do servidor: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro completo:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });

      if (error.code === 'ECONNABORTED') {
        setError("Tempo de conexão esgotado. O servidor demorou muito para responder.");
      } else if (error.response) {
        const serverError = error.response.data;
        setError(
          serverError.message ||
          serverError.error ||
          `Erro ${error.response.status}: ${error.response.statusText}` ||
          "Erro no servidor. Tente novamente mais tarde."
        );
      } else if (error.request) {
        setError(`
          Não foi possível conectar ao servidor. Verifique:
          1. Se o servidor está rodando (http://localhost:8080)
          2. Sua conexão com a internet
          3. Se há problemas de CORS (verifique o console)
        `);
      } else {
        setError(`Erro ao configurar a requisição: ${error.message}`);
      }
    }
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
            <div className="pagina-criar-projeto-field">
              <label>Selecionar Imagem: <span className="pagina-criar-projeto-optional">(Opcional)</span></label>
              <div className="pagina-criar-projeto-image-upload-wrapper">
                <button 
                  type="button" 
                  onClick={handleButtonClick} 
                  className="pagina-criar-projeto-button"
                > 
                  {fotoPreview ? "Alterar Imagem" : "Selecionar Imagem"}
                </button>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                /> 
                {fotoPreview && (
                  <div className="pagina-criar-projeto-image-preview">
                    <img src={fotoPreview} alt="Preview" />
                    <button 
                      type="button" 
                      className="pagina-criar-projeto-remove-image"
                      onClick={() => { setFotoPreview(""); setFotoFile(null); }}
                    >
                      × Remover
                    </button>
                  </div>
                )}
              </div>
              <div className="pagina-criar-projeto-file-hint">
                Formatos aceitos: JPEG, PNG (Máx. 2MB)
              </div>
            </div>

            <div className="pagina-criar-projeto-field">
              <label>Nome do Projeto: <span className="pagina-criar-projeto-required">*</span></label>
              <input
                type="text"
                value={nomeProjeto}
                onChange={(e) => setNomeProjeto(e.target.value)}
                className="pagina-criar-projeto-input"
                placeholder="Digite o nome do seu projeto"
                maxLength={100}
              />
            </div>

            <div className="pagina-criar-projeto-field">
              <label>Descrição: <span className="pagina-criar-projeto-required">*</span></label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="pagina-criar-projeto-input"
                placeholder="Descreva seu projeto em detalhes"
                rows={5}
                maxLength={500}
              />
              <div className="pagina-criar-projeto-char-count">
                {descricao.length}/500 caracteres
              </div>
            </div>

            <div className="pagina-criar-projeto-field">
              <label>Data de Início: <span className="pagina-criar-projeto-required">*</span></label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="pagina-criar-projeto-input"
              />
            </div>

            <div className="pagina-criar-projeto-field">
              <label>Contato: <span className="pagina-criar-projeto-required">*</span></label>
              <input
                type="text"
                value={tecnologias}
                onChange={(e) => setTecnologias(e.target.value)}
                className="pagina-criar-projeto-input"
                placeholder="Ex: Instagram @seuuser, email@exemplo.com"
              />
            </div>

            <div className="pagina-criar-projeto-field">
              <label>Gênero do Jogo: <span className="pagina-criar-projeto-required">*</span></label>
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

            {error && (
              <div className="pagina-criar-projeto-error">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            {successMessage && (
              <div className="pagina-criar-projeto-mensagem sucesso">
                <i className="fas fa-check-circle"></i> {successMessage}
              </div>
            )}

            <div className="pagina-criar-projeto-actions">
              <button 
                type="submit" 
                className="pagina-criar-projeto-button primary"
                disabled={!!successMessage}
              >
                {successMessage ? (
                  <><i className="fas fa-spinner fa-spin"></i> Processando...</>
                ) : (
                  <><i className="fas fa-plus"></i> Criar Projeto</>
                )}
              </button>
              
              <button 
                type="button" 
                className="pagina-criar-projeto-button secondary"
                onClick={() => navigate('/Perfil')}
              >
                <i className="fas fa-times"></i> Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default PaginaCriarProjeto;

