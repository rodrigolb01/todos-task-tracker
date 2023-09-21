# TODOS Task Tracker
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/rodrigolb01/todos-task-tracker/blob/main/LICENSE) 

# Sobre o projeto

Aplicação de posts em que cada post possúi uma data e uma descrição.

# Tecnologias utilizadas
- nodejs
- express
- mongodb

# Como executar o projeto

## Back end
Pré-requisitos: 
- nodejs
- npm ou yarn
- um cluster mongodb

```bash
# clonar repositório
git clone https://github.com/rodrigolb01/todos-task-tracker
```

- criar um cluster mongodb. Será necessário o nome de usuário e senha para acessar o banco de dados.

https://www.mongodb.com/basics/clusters/mongodb-cluster-setup

- Após criado o cluster, copiar usuário e senha e substituir na string de conexão do arquivo config/keys.js

```bash

# baixar as dependências (para npm)
npm install

# baixar as dependências (para yarn)
yarn install 

# executar o back end
npm run server

#executar o front end
npm start
```

# Autor

Rodrigo Linhares Barroso

https://www.linkedin.com/in/rodrigo-linhares-barroso-6271671a4/
