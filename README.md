# TODOS Task Tracker
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/rodrigolb01/todos-task-tracker/blob/main/LICENSE) 

# Sobre o projeto

Aplicação de lembretes/anotações em que cada nota possúi uma data e uma descrição.

# Tecnologias utilizadas
- nodejs
- express
- reactjs
- redux
- axios
- mongodb
- google oauth
- nodemailer

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

# executar 
npm start

```

(OPCIONAL - função de redefinir senha do usuário)

- Para usar a função de redefinir senha do botão forgot password é necessário uma conta cloud com credenciais de OAuth2 e um email de host que será usado para enviar o link para a página de redefinição de senha.

- Passo a passo de como como configurar o nodemailer: https://www.youtube.com/watch?v=18qA61bpfUs

# Autor

Rodrigo Linhares Barroso

https://www.linkedin.com/in/rodrigo-linhares-barroso-6271671a4/
