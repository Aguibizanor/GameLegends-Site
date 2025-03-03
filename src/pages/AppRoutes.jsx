import React from "react";
import IndexPrincipal from "./IndexPrincipal";
import PaginaInicial from "./PaginaInicial";
import PaginaSobrevivencia from "../category/Sobrevivencia";
import PaginaLogin from "../Cadastro-Login/PaginaLogin";
import PaginaCartas from "../category/Cartas";
import PaginaCadastro from "../Cadastro-Login/PaginaCadastro";
import Windows from "../category/Windows";
import  { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Terror from "../category/Terror";
import Esporte from "../category/Esporte";
import Aventura from "../category/Aventura";
import Educacional from "../category/Educacional";
import MacOs from "../category/MacOs";
import Android from "../category/Android";
import IOs from "../category/iOs";
import Hoje from "../category/Hoje";
import Essasemana from "../category/Essasemana";
import Essemes from "../category/Essemes";
import Desenvolvido from "../category/Desenvolvido";
import Desenvolvendo from "../category/Desenvolvendo";
import PaginaSuporte from "./PaginaSuporte";
import PaginaMandarEmail from "../Cadastro-Login/PaginaMandarEmail";
import PaginaCodin from "../Cadastro-Login/PaginaCodin";
import PaginaRedefinirSenha from "../Cadastro-Login/PaginaRedefinirSenha";
import PaginaPerfil from "../Perfil/PaginaPerfil";
import PaginaPerfDesenvolvedor from "../Perfil/PaginaPerfDesenvolvedor";
import PaginaCriarProjeto from "../Perfil/PaginaCriarProjeto";
import PaginaDescricao from "./PaginaDescricao";
import PaginaQuem from "./PaginaQuem";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Index" element={<IndexPrincipal/>} />
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/Sobrevivencia" element={<PaginaSobrevivencia />} />
        <Route path="/Login" element={<PaginaLogin />} />
        <Route path="/Cartas" element={<PaginaCartas />} />
        <Route path="/Cadastro" element={<PaginaCadastro />} />
        <Route path="/Windows" element={<Windows />} />
        <Route path="/Terror" element={<Terror/>} />
        <Route path="/Esporte" element={<Esporte/>} />
        <Route path="/Aventura" element={<Aventura/>} />
        <Route path="/Educacional" element={<Educacional/>} />
        <Route path="/MacOs" element={<MacOs/>} />
        <Route path="/Android" element={<Android/>} />
        <Route path="/iOs" element={<IOs/>} />
        <Route path="/Hoje" element={<Hoje/>} />
        <Route path="/Essasemana" element={<Essasemana/>} />
        <Route path="/Essemes" element={<Essemes/>} />
        <Route path="/Desenvolvido" element={<Desenvolvido/>} />
        <Route path="/Desenvolvendo" element={<Desenvolvendo/>} />
        <Route path="/Suporte" element={<PaginaSuporte/>} />
        <Route path="/MandarEmail" element={<PaginaMandarEmail/>} />
        <Route path="/MandarCodin" element={<PaginaCodin/>} />
        <Route path="/RedefinirSenha" element={<PaginaRedefinirSenha/>} />
        <Route path="/Perfil" element={<PaginaPerfil/>} />
        <Route path="/Perfil1" element={<PaginaPerfDesenvolvedor/>} />
        <Route path="/Criar" element={<PaginaCriarProjeto/>} />
        <Route path="/Descricao" element={<PaginaDescricao/>} />
        <Route path="/Que" element={<PaginaQuem/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;