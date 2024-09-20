import React from 'react';
import './PaginaMandarEmail.css';
import { Link } from "react-router-dom";
import Logo from "../assets/logo.site.tcc.png";
import viva from "../assets/viva.png";

const PaginaMandarEmail = () => {
  return (
<div className="container">
<h1>Redefinir Senha</h1>
<p>Para redefinir sua senha, coloque seu Email:</p>
<form>
<label>Email:</label>
<input type="email" required />
<button type="submit" className="mandar_email">MANDE EMAIL</button>
</form>
<p>
        Lembrou a senha? <Link to={'/Login'}><a href="">Faça login</a></Link>
</p>
</div>
  );
};
export default PaginaMandarEmail;