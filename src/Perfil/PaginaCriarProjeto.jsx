import React, { useState, useEffect } from "react";
import './PaginaCriarProjeto.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Header';

function PaginaCriarProjeto() {
  const [formData, setFormData] = useState({
    email: "",
    usuario: "",
    nome: ""
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
        usuario: usuarioData.usuario,
        nome: usuarioData.nome
      });
    }
  }, []);



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
    form.append("emailDesenvolvedor", formData.email); // Email do desenvolvedor
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
      <Header />

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

