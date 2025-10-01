import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ marginTop = '50px' }) => {
    return (
        <footer style={{ backgroundColor: '#90017F', padding: '40px 20px', marginTop }}>
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
    );
};

export default Footer;