# API Cubos Bank

A API Cubos Bank é uma aplicação backend que implementa funcionalidades básicas de um sistema bancário. Foi desenvolvida como parte de um desafio do módulo 2 do curso de Desenvolvimento de Software Backend ministrado pela Cubos Academy.

## Funcionalidades

A API Cubos Bank oferece as seguintes funcionalidades:

### Gerenciamento de Contas
- Listar todas as contas (Endpoint: `/contas` - Método: GET)
![image](https://github.com/WelliRangel/API/assets/134741348/8489b1b1-5881-410b-9f73-0e41e8071814)

- Criar uma nova conta (Endpoint: `/contas` - Método: POST)
![image](https://github.com/WelliRangel/API/assets/134741348/c73b0e77-e407-4d1c-8f4a-085b93f7544e)

- Atualizar uma conta
![image](https://github.com/WelliRangel/API/assets/134741348/e7c517f1-fd97-4442-bc5c-7c031bbe0fd7)

- Excluir uma conta (O saldo precisa ser zero)
![image](https://github.com/WelliRangel/API/assets/134741348/c23dd967-9a62-4f5b-9fbe-f1b05babda10)



### Operações Bancárias
- Depositar em uma conta (Endpoint: `/transacoes/depositar` - Método: POST)
![image](https://github.com/WelliRangel/API/assets/134741348/1fd54c5d-397a-40f4-a037-8451de2a4f78)

- Sacar de uma conta (Endpoint: `/transacoes/sacar` - Método: POST)
![image](https://github.com/WelliRangel/API/assets/134741348/c5261805-ab34-4012-b3c2-77e5fa653235)

- Transferir entre contas (Endpoint: `/transacoes/transferir` - Método: POST)
![image](https://github.com/WelliRangel/API/assets/134741348/8102fcf2-9e3c-4800-954a-609e14613b36)

### Consultas
- Obter o saldo de uma conta (Endpoint: `/contas/:numeroConta/saldo` - Método: GET)
- Obter o extrato de transações de uma conta (Endpoint: `/contas/:numeroConta/extrato` - Método: GET)

## Instalação

### Requisitos

Para instalar a API Cubos Bank, você precisará dos seguintes requisitos:

- Node.js
- Git
- VSCode

### Passos

1. Clone o repositório:
   ```bash
   git clone git@github.com:WelliRangel/API.git
2. Navegue até o diretório do projeto:
    ```bash
    cd API
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie o servidor:
    ```bash
    npm run dev
    ```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

## Tecnologias Utilizadas

A API Cubos Bank é desenvolvida com as seguintes tecnologias:

- Node.js
- Express.js
- Nodemon

## Autor

Wellington Rangel
