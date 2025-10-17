import React, { useState } from 'react';
import './PaginaCodin.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import sonic from "../assets/sonic.png";
import esquerda from "../assets/esquerda.png";
import RedefinirSenhaService from '../services/ApiService' //'../services/RedefinirSenhaService';
 
const PaginaCodin = () => {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newCodigo = [...codigo];
      newCodigo[index] = value;
      setCodigo(newCodigo);
     
      if (value.length === 1 && index < 5) {
        const inputs = document.querySelectorAll('.code-inputs input');
        inputs[index + 1].focus();
      }
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length !== 6) {
      setMessage('❌ Digite o código completo de 6 dígitos');
      return;
    }
   
    setLoading(true);
    setMessage('');
   
    try {
      const valido = await RedefinirSenhaService.verificarCodigo(codigoCompleto);
     
      if (valido) {
        setMessage('✅ Código verificado com sucesso!');
        setTimeout(() => {
          navigate('/RedefinirSenha');
        }, 1000);
      } else {
        setMessage('❌ Código inválido ou expirado');
        setCodigo(['', '', '', '', '', '']);
      }
    } catch (e) {
      setMessage(`❌ Erro: ${e.toString()}`);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="app">
      <head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </head>
      <Header />
 
      <main className="main">
        <div className="ÇUCA">
          <div className="AAA">
            <div className="container">
              <h1 className="Titu">Verificar Código</h1>
              <p className="OP">Digite o código de 6 dígitos:</p>
              {RedefinirSenhaService.emailAtual && (
                <div style={{
                  padding: '12px',
                  margin: '10px 0',
                  backgroundColor: RedefinirSenhaService.isEmailReal ? '#d4edda' : '#cce7ff',
                  border: `1px solid ${RedefinirSenhaService.isEmailReal ? '#c3e6cb' : '#b3d9ff'}`,
                  borderRadius: '5px',
                  fontSize: '13px',
                  color: RedefinirSenhaService.isEmailReal ? '#155724' : '#004085'
                }}>
                  {RedefinirSenhaService.isEmailReal ? '📧' : '💾'}
                  {RedefinirSenhaService.isEmailReal
                    ? `Verifique sua caixa de entrada: ${RedefinirSenhaService.emailAtual}`
                    : `Código salvo no banco para: ${RedefinirSenhaService.emailAtual}`
                  }
                </div>
              )}
              <div className="content">
                <div className="side-image">
                  <img src={sonic} alt="Pixel art character" className="character-icon1" />
                </div>
                <div className="form-content">
                  <form className="Form" onSubmit={handleSubmit}>
                    <div className="code-inputs" style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '20px 0' }}>
                      {codigo.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          required
                          value={digit}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !digit && index > 0) {
                              const inputs = document.querySelectorAll('.code-inputs input');
                              inputs[index - 1].focus();
                            }
                          }}
                          style={{
                            width: '50px',
                            height: '60px',
                            textAlign: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            border: '2px solid #90017F',
                            borderRadius: '8px',
                            color: '#90017F'
                          }}
                        />
                      ))}
                    </div>
                    <button type="submit" className="botãoconfirmar" disabled={loading}>
                      {loading ? 'VERIFICANDO...' : 'VERIFICAR CÓDIGO'}
                    </button>
                    {message && (
                      <div style={{
                        marginTop: '15px',
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
                        color: message.includes('✅') ? '#155724' : '#721c24',
                        border: message.includes('✅') ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
                      }}>
                        {message}
                      </div>
                    )}
                  </form>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <Link to={'/MandarEmail'} style={{ color: '#666', textDecoration: 'none' }}>← Voltar</Link>
                    <Link to={'/MandarEmail'} style={{ color: '#ff8c00', textDecoration: 'none' }}>Gerar novo código</Link>
                  </div>
                </div>
                <div className="side-image">
                  <img src={sonic} alt="Pixel art character" className="character-icon1" />
                </div>
              </div>
              <Link to={'/MandarEmail'}><img src={esquerda} alt="Seta" className="SetaLog" /></Link>
            </div>
          </div>
        </div>
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
              <a href="https://www.reddit.com/r/Game_Legends_jogos/s/GZVUlKiWg8" target="_blank" rel="noopener noreferrer"
                 style={{
                   backgroundColor: '#FF6B6B',
                   borderRadius: '50%',
                   width: '50px',
                   height: '50px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   textDecoration: 'none'
                 }}><i className="fab fa-reddit" style={{ color: 'white', fontSize: '20px' }}></i>
              </a>
              <a href="https://www.reddit.com/r/Game_Legends_jogos/s/GZVUlKiWg8"
                 target="_blank"
                 rel="noopener noreferrer"
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
};
 
export default PaginaCodin;

