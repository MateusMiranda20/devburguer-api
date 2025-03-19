# API de Hamburgueria

Este é o backend de uma aplicação de hamburgueria, desenvolvido utilizando Node.js com a estrutura MVC.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize** (ORM para interação com banco de dados)
- **PostgreSQL** (banco de dados)
- **JWT** (autenticação)
- **Multer** (upload de arquivos)
- **Docker** (para containerização)
- **ESLint e Prettier** (padronização de código)

## Estrutura do Projeto

```
HAMBURGUERIA-API/
│-- src/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── stripe/
│   │   │   ├── CategoryController.js
│   │   │   ├── OrderController.js
│   │   │   ├── ProductController.js
│   │   │   ├── SessionController.js
│   │   │   ├── UserController.js
│   │   ├── middlewares/
│   │   │   ├── auth.js
│   │   ├── models/
│   │   │   ├── Category.js
│   │   │   ├── Products.js
│   │   │   ├── User.js
│   │   │   ├── Order.js
│   │   ├── schemas/
│   │   │   ├── auth.js
│   │   ├── config/
│   │   │   ├── auth.js
│   │   │   ├── database.js
│   │   │   ├── multer.js
│   ├── database/
│   │   ├── migrations/
│   ├── uploads/
│   ├── index.js
│   ├── routes.js
│   ├── server.js
│
│-- .env
│-- .gitignore
│-- .eslintrc.json
│-- .prettierrc.json
│-- .sequelizerc
│-- eslint.config.mjs
│-- package.json
```

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```sh
   yarn install
   ```

3. Configure as variáveis de ambiente:

   - Renomeie o arquivo `.env.example` para `.env` e preencha com as credenciais corretas.

4. Execute as migrações para o banco de dados:

   ```sh
   yarn sequelize db:migrate
   ```

## Executando o projeto

Para iniciar o servidor em ambiente de desenvolvimento:

```sh
yarn dev
```

O servidor iniciará na porta definida no arquivo `.env`. Caso não tenha sido especificada, o padrão é `http://localhost:3333`.  
Se estiver rodando em produção no Render, a API estará disponível em `https://seu-app.onrender.com`.


## Rotas

A API possui as seguintes rotas principais:

### Autenticação

- `POST /session` - Autentica o usuário e retorna um token JWT.

### Usuários

- `POST /users` - Cria um novo usuário.

### Produtos

- `GET /products` - Lista todos os produtos.
- `POST /products` - Cria um novo produto.
- `PUT /products/:id` - Atualiza um produto existente (somente admin).

### Categorias

- `GET /categories` - Lista todas as categorias.
- `POST /categories` - Cria uma nova categoria.
- `PUT /categories/:id` - Atualiza uma categoria existente (somente admin).

### Pedidos

- `GET /orders` - Lista todos os pedidos.
- `POST /orders` - Cria um novo pedido.
- `PUT /orders/:id` - Atualiza um pedido existente (somente admin).

### Pagamento

- `POST /create-payment-intent` - Cria uma intenção de pagamento.


