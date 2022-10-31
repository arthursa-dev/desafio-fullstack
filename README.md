# Desafio FullStack 

Em todo aplicativo comercial temos um controle dos profissionais envolvidos no processo sejam usuários, responsáveis, gerentes, administradores, operadores, etc. Por isso um ponto importante de qualquer aplicação é permitir designarmos estas funções ou seja categorizar em tipos estes profissionais.  Ex.: Ana = Médica, José = Professor... 

Essa é uma aplicação que nos permite consultar, criar e editar essas informações e manter essa relação entre o profissional e seu tipo.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


### 📋 Pré-requisitos

```
Git
Node.JS
npm
PostgreSQL
```
```
git clone https://github.com/arthursa-dev/desafio-fullstack.git
```

### 🔧 Instalação

Backend:
```
1. Primeiramente, crie dois databases, desafio-dev e desafio-test, via terminal, acessando o PostgreSQL por meio do psql, ou via cliente gráfico de sua preferência
2. Criados os dois databases, há um arquivo sql dentro de /backend/sql com todas as queries necessárias para criar as duas tabelas indispensáveis para o funcionamento da aplicação. Basta executá-las, usando a mesma ferramenta escolhida no passo anterior
3. Com isso feito, navegue até a pasta backend e instale as dependências rodando "npm i" no terminal
4. Feito isso, é possível executar a aplicação backend rodando "npm run dev"
```

Frontend:

```
1. Navegue até a pasta web e instale as dependências rodando "npm i" no terminal
2. Terminada a instalação, você pode executar a aplicação web também rodando "npm run dev"
```

## ⚙️ Executando os testes

Para rodar os testes, navegue até a pasta backend e rode "npm t" no seu terminal

## 📄 Documentação da API
```
http://localhost:3333/docs
```

## 🛠️ Construído com

* [PostgreSQL](https://www.postgresql.org/)
* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/pt-br/)
* [pg-promise](https://www.npmjs.com/package/pg-promise)
* [Jest](https://jestjs.io/pt-BR/)
* [Swagger](https://swagger.io/)
* [Vite](https://vitejs.dev/)
* [React](https://pt-br.reactjs.org/)
* [Ant Design](https://ant.design/)

## ✒️ Autores

* **Arthur dos Santos Almeida** - [GitHub](https://github.com/arthursa-dev)

## 📄 Licença

Este projeto está sob a licença ISC
