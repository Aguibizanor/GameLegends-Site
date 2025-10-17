import React, { useState, useEffect } from "react";
import './PaginaCriarProjeto.css';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import Header from '../components/Header';

function PaginaCriarProjeto() {
  const [formData, setFormData] = useState({
    email: "",
    usuario: "",
    nome: "",
    id: null
  });

  // Alinhamento com o banco:
  // nomeProjeto, descricao, dataInicio, tecnologias, genero, foto (byte[])
  const [nome, setNome] = useState("");
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
        tipoUsuario: usuarioData.tipoUsuario,
        nome: usuarioData.nome,
        id: usuarioData.id
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

    if (!nome || !descricao || !dataInicio || !tecnologias || !genero) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!formData.id || !formData.email) {
      setError("Você precisa estar logado para criar um projeto. Faça login e tente novamente.");
      return;
    }

    setError("");
    setSuccessMessage("");

    // Criar FormData no formato especificado
    const form = new FormData();
    form.append("nome", nome);
    form.append("generoJogo", genero);
    form.append("descricao", descricao);
    form.append("contato", tecnologias);
    form.append("idUsuario", formData.id);
    form.append("dataInicio", dataInicio);
    form.append("statusProjeto", "Ativo");
    if (fotoFile) {
      form.append("foto", fotoFile);
    }

    // Imprimir o objeto criado no console
    console.log("Objeto FormData criado:");
    for (let [key, value] of form.entries()) {
      console.log(key, value);
    }

    try {
      await ApiService.criarProjeto(form);
      setSuccessMessage("Projeto criado com sucesso! Criação do projeto concluída.");
      setNome("");
      setDescricao("");
      setDataInicio("");
      setTecnologias("");
      setGenero("");
      setFotoPreview("");
      setFotoFile(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="pagina-criar-projeto-app">
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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

