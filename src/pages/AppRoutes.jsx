import React from "react";
import { Route, Routes } from "react-router-dom";
import IndexPrincipal from "./IndexPrincipal"; //IGNORE!! Funciona, só é bug!
import PaginaInicial from "./PaginaInicial";
import PaginaSobrevivencia from "../category/Sobrevivencia";
import PaginaLogin from "../Cadastro-Login/PaginaLogin";
import PaginaCartas from "../category/Cartas";
import PaginaCadastro from "../Cadastro-Login/PaginaCadastro";
import Windows from "../category/Windows";
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
import PaginaCriarProjeto from "../Perfil/PaginaCriarProjeto";
import PaginaDescricao from "./PaginaDescricao";
import PaginaDescricao2 from "./PaginaDescricao2";
import PaginaDescricao3 from "./PaginaDescricao3";
import JogoDetalhes from "./JogoDetalhes";
import JogoCarrossel from "./JogoCarrossel";
import PaginaQuem from "./PaginaQuem";
import PaginaPrivacidade from "./PaginaPrivacidade";
 
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Index" element={<IndexPrincipal />} />
      <Route path="/" element={<IndexPrincipal />} />
      <Route path="/Games" element={<PaginaInicial />} />
      <Route path="/Sobrevivencia" element={<PaginaSobrevivencia />} />
      <Route path="/Login" element={<PaginaLogin />} />
      <Route path="/Cartas" element={<PaginaCartas />} />
      <Route path="/Cadastro" element={<PaginaCadastro />} />
      <Route path="/Windows" element={<Windows />} />
      <Route path="/Terror" element={<Terror />} />
      <Route path="/Esporte" element={<Esporte />} />
      <Route path="/Aventura" element={<Aventura />} />
      <Route path="/Educacional" element={<Educacional />} />
      <Route path="/MacOs" element={<MacOs />} />
      <Route path="/Android" element={<Android />} />
      <Route path="/iOs" element={<IOs />} />
      <Route path="/Hoje" element={<Hoje />} />
      <Route path="/Essasemana" element={<Essasemana />} />
      <Route path="/Essemes" element={<Essemes />} />
      <Route path="/Desenvolvido" element={<Desenvolvido />} />
      <Route path="/Desenvolvendo" element={<Desenvolvendo />} />
      <Route path="/Suporte" element={<PaginaSuporte />} />
      <Route path="/MandarEmail" element={<PaginaMandarEmail />} />
      <Route path="/MandarCodin" element={<PaginaCodin />} />
      <Route path="/RedefinirSenha" element={<PaginaRedefinirSenha />} />
      <Route path="/Perfil" element={<PaginaPerfil />} />
      <Route path="/Criar" element={<PaginaCriarProjeto />} />
      <Route path="/Descricao/1" element={<PaginaDescricao />} />
      <Route path="/Descricao/2" element={<PaginaDescricao2 />} />
      <Route path="/Descricao/3" element={<PaginaDescricao3 />} />
      <Route path="/jogo" element={<JogoDetalhes />} />
      <Route path="/Descricao2" element={<PaginaDescricao2 />} />
      <Route path="/Descricao3" element={<PaginaDescricao3 />} />
      <Route path="/Carrossel/:id" element={<JogoCarrossel />} />
      <Route path="*" element={<PaginaInicial />} />
      <Route path="/Que" element={<PaginaQuem />} />
      <Route path="/Privacidade" element={<PaginaPrivacidade />} />
    </Routes>
  );
};
 
export default AppRoutes;
 
 
 
 