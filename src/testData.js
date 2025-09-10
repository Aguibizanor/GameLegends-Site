// Função para simular login de desenvolvedor de teste
export const loginDesenvolvedor = () => {
  const developerData = {
    id: 999,
    nome: "Desenvolvedor",
    sobrenome: "Teste",
    email: "dev@teste.com",
    usuario: "Desenvolvedor"
  };
  
  localStorage.setItem('usuario', JSON.stringify(developerData));
  console.log('Desenvolvedor de teste logado:', developerData);
  return developerData;
};

// Função para simular login de cliente
export const loginCliente = () => {
  const clienteData = {
    id: 998,
    nome: "Cliente",
    sobrenome: "Teste",
    email: "cliente@teste.com",
    usuario: "Cliente"
  };
  
  localStorage.setItem('usuario', JSON.stringify(clienteData));
  console.log('Cliente de teste logado:', clienteData);
  return clienteData;
};

// Função para fazer logout
export const logout = () => {
  localStorage.removeItem('usuario');
  console.log('Usuário deslogado');
};