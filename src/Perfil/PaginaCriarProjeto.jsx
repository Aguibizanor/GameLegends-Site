import React, { useState } from "react";
import './PaginaCriarProjeto.css'; // Importa o arquivo CSS
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import esquerda from "../assets/esquerda.png";

function PaginaCriarProjeto() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [tecnologias, setTecnologias] = useState("");
  const [genero, setGenero] = useState(""); // Adicionando estado para o gênero do jogo
  const [image, setImage] = useState(""); // Adicionando estado para a imagem
  const [error, setError] = useState("");

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nomeProjeto || !descricao || !dataInicio || !tecnologias || !genero) {
      setError("Por favor, preencha todos os campos.");
    } else {
      setError("");
      console.log("Nome do Projeto:", nomeProjeto);
      console.log("Descrição:", descricao);
      console.log("Data de Início:", dataInicio);
      console.log("Tecnologias:", tecnologias);
      console.log("Gênero:", genero); // Exibir o gênero no console
      console.log("Imagem:", image); // Exibir a imagem no console
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Atualiza o estado da imagem
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
      <header className="pagina-criar-projeto-cabecalho">
        <div className="pagina-criar-projeto-conteudo-cabecalho">
          <h1 className="pagina-criar-projeto-logo">
            <Link to="/" title="Game Legends">
              <img src={Logo} alt="Logo do Game Legends" />
            </Link>
          </h1>
          <nav className={`pagina-criar-projeto-navegacao ${menuAberto ? 'ativo' : ''}`}>
            <Link to={'/Index'} className="pagina-criar-projeto-nav-item"><i className="fas fa-home"></i><span className="pagina-criar-projeto-nav-label">Início</span></Link>
            <Link to={'/'} className="pagina-criar-projeto-nav-item"><i className="fas fa-gamepad"></i><span className="pagina-criar-projeto-nav-label">Games</span></Link>
            <Link to={'/Que'} className="pagina-criar-projeto-nav-item"><i className="fas fa-question-circle"></i><span className="pagina-criar-projeto-nav-label">Sobre</span></Link>
            <Link to={'/Suporte'} className="pagina-criar-projeto-nav-item"><i className="fas fa-headset"></i><span className="pagina-criar-projeto-nav-label">Suporte</span></Link>
          </nav>
          <button className="pagina-criar-projeto-hamburguer" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <form className="pagina-criar-projeto-formulario-pesquisa" action="/search">
            <input required="required" name="q" placeholder="Pesquisar Jogos, Tags ou Criadores" className="pagina-criar-projeto-input-pesquisa" type="text"/>
            <button className="pagina-criar-projeto-botao-pesquisa" aria-label="Search">
              <svg version="1.1" width="18" height="18" role="img" viewBox="0 0 24 24" aria-hidden="true" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" className="pagina-criar-projeto-icone-pesquisa" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <div className="pagina-criar-projeto-painel-usuario">
            <Link className="pagina-criar-projeto-link-usuario" to="/login">Login</Link>
            <Link className="pagina-criar-projeto-link-usuario" to="/register">Registre-se</Link>
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
            <button type="submit" className="pagina-criar-projeto-button">Criar Projeto</button>
          </form>
        </div>
        <Link to={'/Perfil1'}><img src={esquerda} alt="Seta" className="pagina-criar-projeto-seta" /></Link>
      </main>

      <footer className="pagina-criar-projeto-rodape">
        <div className="pagina-criar-projeto-conteudo-rodape">
          <div className="pagina-criar-projeto-secao-rodape sobre">
            <h1 className="pagina-criar-projeto-logo-rodape"><span>Game</span>Legends</h1>
            <p>
              Game Legends é uma plataforma dedicada a jogos indie, fornecendo uma maneira fácil para desenvolvedores distribuírem seus jogos e para jogadores descobrirem novas experiências.
            </p>
            <div className="pagina-criar-projeto-contato-rodape">
              <span><i className="fas fa-phone"></i> &nbsp; (99) 99999-9999</span>
              <span><i className="fas fa-envelope"></i> &nbsp; info@gamelegends.com</span>
            </div>
            <div className="pagina-criar-projeto-redes-sociais">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="pagina-criar-projeto-secao-rodape links">
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
        <div className="pagina-criar-projeto-rodape-inferior">
          &copy; gamelegends.com | Feito pelo time do Game Legends 
        </div>
      </footer>
    </div>
  );
}

export default PaginaCriarProjeto;