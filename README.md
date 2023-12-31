<br/>
<p align="center">
  <a href="https://github.com/RafaelSFDC/AppWrite-Chat">
    <img src="images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ChatWrite</h3>

  <p align="center">
    Um aplicativo de conversa criado usando Appwrite como banco de dados e autenticação. O propósito principal desse projeto é servir como uma extensão de outro projeto que estou fazendo.
    <br/>
    <br/>
    <a href="https://github.com/RafaelSFDC/AppWrite-Chat"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <!-- <a href="https://github.com/RafaelSFDC/AppWrite-Chat">View Demo</a>
    .
    <a href="https://github.com/RafaelSFDC/AppWrite-Chat/issues">Report Bug</a>
    .
    <a href="https://github.com/RafaelSFDC/AppWrite-Chat/issues">Request Feature</a> -->
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/RafaelSFDC/AppWrite-Chat?color=dark-green) ![Issues](https://img.shields.io/github/issues/RafaelSFDC/AppWrite-Chat) ![License](https://img.shields.io/github/license/RafaelSFDC/AppWrite-Chat)

## Table Of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## About The Project

![Screen Shot](public/images/logo.svg)

Esse é um aplicativo criado usando Appwrite como banco de dados e autenticação. O propósito principal desse projeto é servir como uma extensão de outro projeto que estou fazendo. O projeto não requer conhecimentos muito avançados e eu não estou usando nenhuma api externa além do Appwrite.

## Lista de dependências

- [Vite](https://vitejs.dev/)
- [AppWrite](https://appwrite.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router Dom](https://reactrouter.com/en/main)
- [Valtio](https://valtio.pmnd.rs/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Sass](https://sass-lang.com/)
- [React-loader-spinner](https://mhnpd.github.io/react-loader-spinner/)
- [React-dropzone](https://www.npmjs.com/package/react-dropzone)

## Começando

Vou assumir que você já tenha o básico para usar react instalado.

1. Primeiramente você precisa ir para site [Appwrite](https://www.framer.com/motion/), criar uma conta e criar um projeto.
2. **(Opcional)** Use a opção adicionar plataforma selecione sua plataforma e use as instruções para configurar o seu projeto.
3. Depois disso crie uma Database
4. Crie 3 coleções Users, Chats e Messages.
   > [!IMPORTANT]  
   > Se a Database for configurado de forma errada o projeto não vai funcionar então preste atenção em cada etapa.
5. Na coleção Users você vai adicionar 2 Attributes do tipo relationship.

- Messages : relationship = Two-way relationship, Attribute Key = messages, Relation > Many to many, On deleting a document = Set null
- Chats: relationship = Two-way relationship, Attribute Key = chats, Attribute Key (related collection) = users, Relation > Many to many, On deleting a document = Set null

6. Na coleção Chats você vai criar 1 relação com Messages.

- Two-way relationship, Attribute Key = messages, Relation > Many to many, On deleting a document = Set null

7. Se por algum motivo Messages não tiver relações criadas com os outros dois crie agora, mesmas configurações.

- Crie um atributo do tipo string e de o nome de body, pode criar url também e por img, se quiser conseguir mandar imagens, embora eu não tenha configurado

Pronto! Agora com esta configuração você pode criar um chat que terá vários usuários,. Após o chat ser criado você pode criar mensagens que terão um usuário e um chat . Com isso feito se você quiser filtrar uma conversa você só precisa ir na coleção de chat do usuários específicos.

### Pré-requisitos

- npm

```sh
npm install npm@latest -g
```

### Instalação

1. Clone o repositório

```sh
git clone https://github.com/RafaelSFDC/AppWrite-Chat.git
```

2. Instale as Dependências

```sh
npm install ou yarn
```

3. Crie seu arquivo .env e configure suas chaves, o nome das chaves é bem direto ao ponto então não acho que devam ter dificuldade

```JS
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_URL=""
VITE_APPWRITE_STORAGE_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_USER_COLLECTION_ID=""
VITE_APPWRITE_MESSAGES_COLLECTION_ID=""
VITE_APPWRITE_CHATS_COLLECTION_ID=""

```

## Uso

Esse projeto foi feito como um experimento para uma aplicação futura caso eu vá utilizar appWrite, justamente por isso não me utilizei de nenhuma api
