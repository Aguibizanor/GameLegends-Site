# API Service

Este arquivo centraliza todas as chamadas de API do projeto GameLegends-Site.

## Estrutura

### ApiService.js
Classe principal que contém todos os métodos para comunicação com o backend.

### DeveloperService.js
Serviço específico para funcionalidades de desenvolvedor, utiliza o ApiService internamente.

## Uso do ApiService

### Importação
```javascript
import ApiService from '../services/ApiService';
```

### Métodos Disponíveis

#### Autenticação
- `ApiService.login(email, senha)` - Realiza login do usuário
- `ApiService.cadastro(dadosCadastro)` - Cadastra novo usuário

#### Perfil do Usuário
- `ApiService.deletarPerfil(idUsuario)` - Deleta perfil do usuário
- `ApiService.atualizarPerfil(dadosUsuario)` - Atualiza dados do perfil

#### Redefinição de Senha
- `ApiService.enviarCodigoRedefinicao(email)` - Envia código para redefinir senha
- `ApiService.verificarCodigo(email, codigo)` - Verifica código de redefinição
- `ApiService.redefinirSenha(email, novaSenha)` - Redefine a senha

#### Projetos
- `ApiService.criarProjeto(formData)` - Cria novo projeto
- `ApiService.deletarProjeto(projectId)` - Deleta projeto

#### Dados
- `ApiService.carregarCarrossel()` - Carrega dados do carrossel

#### Utilitários
- `ApiService.isEmailReal(email)` - Verifica se é um provedor de email real

## Configuração

A URL base da API está definida como:
```javascript
const API_BASE_URL = "http://localhost:8080";
```

## Tratamento de Erros

Todos os métodos incluem tratamento de erro padronizado que retorna mensagens amigáveis ao usuário.

## Exemplo de Uso

```javascript
// Login
try {
  const userData = await ApiService.login(email, senha);
  localStorage.setItem('usuario', JSON.stringify(userData));
  // Sucesso
} catch (error) {
  setErrorMessage(error.message);
}

// Cadastro
try {
  await ApiService.cadastro(dadosCadastro);
  // Sucesso
} catch (error) {
  setMessage(error.message);
}
```