import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from "../assets/logo.site.tcc.png";
import esquerda from "../assets/esquerda.png";
import './PaginaDescricao.css';

const JogoDescricao = () => {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalDownloadAberto, setModalDownloadAberto] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/projetos/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Projeto não encontrado');
          return response.json();
        })
        .then(data => {
          setProjeto(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const abrirModalDownload = () => setModalDownloadAberto(true);
  const fecharModalDownload = () => setModalDownloadAberto(false);

  if (loading) return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #90017F 0%, #B19CD9 100%)', color: 'white', fontSize: '1.5rem'}}>
      🎮 Carregando seu jogo incrível...
    </div>
  );
  
  if (!projeto) return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)', color: 'white', textAlign: 'center'}}>
      <div style={{fontSize: '4rem', marginBottom: '20px'}}>😭</div>
      <h2 style={{fontSize: '2rem', marginBottom: '15px'}}>Oops! Jogo não encontrado</h2>
      <p style={{fontSize: '1.2rem', marginBottom: '30px'}}>Parece que este jogo saiu para uma aventura!</p>
      <Link to="/" style={{background: 'white', color: '#FF6B35', padding: '15px 30px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem'}}>
        🎆 Voltar para os Jogos
      </Link>
    </div>
  );

  return (
    <div className="GIT">
      <header style={{background: 'linear-gradient(135deg, #90017F 0%, #B19CD9 100%)', color: 'white', padding: '15px 0', boxShadow: '0 4px 20px rgba(144, 1, 127, 0.3)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={Logo} alt="Logo" style={{width: '120px', filter: 'brightness(1.2)'}} />
            <span style={{marginLeft: '15px', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>Game Legends</span>
          </div>
          <nav style={{display: 'flex', alignItems: 'center'}}>
            <Link 
              to={'/'} 
              style={{
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none', 
                color: 'white', 
                background: 'rgba(255,255,255,0.2)', 
                padding: '12px 20px', 
                borderRadius: '25px', 
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              🎮 Games
            </Link>
          </nav>
        </div>
      </header>
      
      <div style={{maxWidth: '1200px', margin: '40px auto', padding: '0 20px'}}>
        <div style={{background: 'white', borderRadius: '20px', boxShadow: '0 10px 40px rgba(144, 1, 127, 0.15)', overflow: 'hidden'}}>
          <div style={{padding: '40px'}}>
            <div style={{position: 'relative', marginBottom: '30px'}}>
              <img 
                src={`http://localhost:8080/projetos/${projeto.id}/foto`} 
                alt={projeto.nomeProjeto} 
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
              <div 
                style={{
                  display: 'none', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '300px', 
                  background: 'linear-gradient(135deg, #E9ECEF 0%, #F8F9FA 100%)', 
                  borderRadius: '15px',
                  fontSize: '1.5rem',
                  color: '#6C757D',
                  border: '2px dashed #DEE2E6'
                }}
              >
                🎮 Sem imagem disponível
              </div>
            </div>
            
            <div className="description">
              <h1 style={{color: '#90017F', fontSize: '2.5rem', marginBottom: '20px'}}>🎯 {projeto.nomeProjeto}</h1>
              <p style={{fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '25px'}}>📝 {projeto.descricao}</p>
              
              <div className="project-info" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '25px', borderRadius: '15px', marginBottom: '25px'}}>
                <p><strong>🎮 Gênero:</strong> {projeto.genero}</p>
                <p><strong>⚙️ Tecnologias:</strong> {projeto.tecnologias}</p>
                <p><strong>📅 Data de Início:</strong> {projeto.dataInicio}</p>
                {projeto.statusProjeto && <p><strong>🚀 Status:</strong> {projeto.statusProjeto}</p>}
              </div>
              
              <div className="credits">
                <button 
                  className="download-btn" 
                  onClick={abrirModalDownload}
                  style={{
                    background: 'linear-gradient(135deg, #90017F 0%, #B19CD9 100%)',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    borderRadius: '25px',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(144, 1, 127, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  📥 Download Grátis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {modalDownloadAberto && (
        <div className="modal-download">
          <div className="modal-download-content" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', borderRadius: '20px', padding: '30px'}}>
            <span className="fechar" onClick={fecharModalDownload} style={{fontSize: '30px', color: '#90017F'}}>&times;</span>
            <h2 style={{color: '#90017F', marginBottom: '20px'}}>🎮 Download - {projeto.nomeProjeto}</h2>
            <p style={{marginBottom: '25px', fontSize: '1.1rem'}}>🚀 Baixe o jogo em uma das opções disponíveis:</p>
            <div className="download-options" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <button className="download-option" style={{background: 'linear-gradient(135deg, #0078D4 0%, #106EBE 100%)', padding: '12px 25px', borderRadius: '10px', border: 'none', color: 'white', fontSize: '1rem'}}>🪟 Windows</button>
              <button className="download-option" style={{background: 'linear-gradient(135deg, #28A745 0%, #20C997 100%)', padding: '12px 25px', borderRadius: '10px', border: 'none', color: 'white', fontSize: '1rem'}}>🐧 Linux</button>
              <button className="download-option" style={{background: 'linear-gradient(135deg, #3DDC84 0%, #00C851 100%)', padding: '12px 25px', borderRadius: '10px', border: 'none', color: 'white', fontSize: '1rem'}}>🤖 Android</button>
              <button className="download-option" style={{background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)', padding: '12px 25px', borderRadius: '10px', border: 'none', color: 'white', fontSize: '1rem'}}>📱 iOS</button>
            </div>
          </div>
        </div>
      )}
      
      <Link to={'/'}>
        <img 
          src={esquerda} 
          alt="Voltar" 
          className="seta" 
          style={{
            position: 'fixed',
            top: '50%',
            left: '20px',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            filter: 'drop-shadow(0 4px 8px rgba(144, 1, 127, 0.3))',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
      </Link>
      
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
              <a href="#"
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
                <i className="fas fa-at" style={{ color: 'white', fontSize: '20px' }}></i>
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
         
          <div style={{
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
          </div>
         
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
};

export default JogoDescricao;