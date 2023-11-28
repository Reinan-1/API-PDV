# API de PDV 

## 💻 Sobre o Projeto 
Esta é uma API para um PDV (Frente de Caixa). Seu propósito principal é fornecer funcionalidades cruciais para a administração eficiente de transações comerciais, abrangendo aspectos como vendas, controle de estoque e interações com clientes.

## 🚀 Deploy da Aplicação
A API está disponível em: [PDV API]()

## 🛠️ Pré-requisitos 
Antes de começar, certifique-se de ter os seguintes requisitos:

- [Node.js](https://nodejs.org/en/download) instalado em seu sistema.
- [PostgreSQL](https://www.postgresql.org/download/) instalado em seu sistema.

## ⚙ Funcionalidades 

<details>
   <summary><b>Usuário</b></summary>
   
   - Cadastrar Usuário
   - Login do Usuário
   - Atualizar Usuário
   - Detalhar Perfil do Usuário
      
</details>

<details>
   <summary><b>Cliente</b></summary>
   
   - Cadastrar Cliente
   - Atualizar Dados do Cliente
   - Detalhar Cliente
   - Listar Clientes
      
</details>

<details>
   <summary><b>Produto</b></summary>
   
   - Cadastrar Produto
   - Atualizar Dados do Produto
   - Detalhar Produto
   - Listar Produtos	
   - Excluir Produto por ID
      
</details>

<details>
   <summary><b>Pedido</b></summary>
   
   - Cadastrar Pedido
   - Listar Pedidos
      
</details>

<details>
   <summary><b>Categoria</b></summary>
   
   - Listar Categorias
      
</details>

## 🧰 Tecnologias Usadas 
- [Node.js](https://nodejs.org/en/download): Plataforma de execução de código JavaScript.
- [Express.js](https://expressjs.com/pt-br/): Framework web para Node.js.
- Bcrypt: Para criptografia.
- Knex: Query builder.
- Jsonwebtoken: Para gerar e validar tokens.
- Dotenv: Para gerenciar variáveis de ambiente.
- [Render](https://render.com/): Para o deploy da API.
- [ElephantSQL](https://www.elephantsql.com/): Para o banco de dados.
- [Nodemailer](https://nodemailer.com/): Para o envio de emails.
- [AWS SDK (Software Development Kit)](https://aws.amazon.com/pt/sdk-for-javascript/): Para operações de armazenamento em nuvem. 

## 📖 Instruções de Uso 

Siga estas etapas para configurar e usar a API:

##### 1. Clone este repositório para o seu ambiente de desenvolvimento local:

```sh
git clone https://github.com/Reinan-1/API-PDV.git
```

##### 2. Navegue até a pasta do projeto e instale as dependências:
   
```sh
cd sua-api-pdv
npm install
```
##### 3. Crie um banco de dados chamado `pdv` e execute o script contido no arquivo `dump.sql` localizado na pasta `sql` para inicializar as tabelas e configurações necessárias.

```sql
CREATE DATABASE pdv;
```

##### 4. Crie um arquivo `.env` na raiz do projeto e adicione as sequintes variáveis de ambiente:

```
PORT=SUA_PORTA_API

JWT_KEY=SUA_SENHA_JWT

DB_HOST=HOST_BANCO_DE_DADOS
DB_PORT=PORTA_BANCO_DE_DADOS
DB_USER=USUARIO_BANCO_DE_DADOS
DB_PASS=SENHA_BANCO_DE_DADOS
DB_NAME=NOME_BANCO_DE_DADOS

KEY_ID=KEY_ID_DO_SEU_BUCKET
APP_KEY=APP_KEY_DO_SEU_BUCKET
BUCKET_NAME=NOME_DO_SEU_BUCKET
ENDPOINT_BUCKET=ENDPOINT_DO_SEU_BUCKET

EMAIL_HOST=HOST_DO_SEU_SMTP
EMAIL_PORT=PORTA_DO_SEU_SMTP
EMAIL_USER=USUARIO_DO_SEU_SMTP
EMAIL_PASS=SENHA_DO_SEU_SMTP

EMAIL_NAME=SEU_NOME_DE_ENVIO_DE_EMAIL
EMAIL_FROM=SEU_ENDERECO_DE_EMAIL
```
##### 5. Inicie o servidor da API:

```
npm run start
```
##### 6. Acesse a API em http://localhost:"porta-da-sua-api".

## 🛢 Banco de Dados

Esta API utiliza um banco de dados chamado `pdv` com as seguintes tabelas:

<details>
   <summary><b>usuarios</b></summary>
   
   - **id:** Identificador único do usuário.
   - **nome:** Nome do usuário.
   - **email:** Endereço de e-mail do usuário (campo único).
   - **senha:** Senha do usuário.
     
</details>

<details>
   <summary><b>categorias</b></summary>
   
   - **id:** Identificador único da categoria.
   - **descricao:** Descrição da categoria.
     
</details>

<details>
   <summary><b>produtos</b></summary>
   
   - **id:** Identificador único do produto.
   - **descricao:** Descrição do produto.
   - **quantidade_estoque:** Quantidade disponível em estoque.
   - **valor:** Valor do produto em centavos.
   - **categoria_id:** Chave estrangeira que referencia a categoria do produto.
   - **produto_imagem:** Url para acessar a imagem do produto.
     
</details>

<details>
   <summary><b>clientes</b></summary>
   
   - **id:** Identificador único do cliente.
   - **nome:** Nome do cliente.
   - **email:** Endereço de e-mail do cliente (campo único).
   - **cpf:** CPF do cliente (campo único).
   - **cep:** CEP do cliente.
   - **rua:** Rua do cliente.
   - **numero:** Número do endereço do cliente.
   - **bairro:** Bairro do cliente.
   - **cidade:** Cidade do cliente.
   - **estado:** Estado do cliente.
     
</details>

<details>
   <summary><b>pedidos</b></summary>
   
   - **id:** Identificador único do produto.
   - **cliente_id:** Chave estrangeira que referencia ao cliente responsável pelo pedido.
   - **observacao:** Observação associada ao pedido, fornecida pelo cliente.
   - **valor_total:** Valor total do pedido em centavos.
 
</details>

<details>
   <summary><b>pedido_produtos</b></summary>
   
   - **id:** Identificador único do produto no pedido.
   - **pedido_id:** Chave estrangeira que referencia ao pedido associado.
   - **produto_id:** Chave estrangeira que referencia ao produto relacionado.
   - **quantidade_produto:** Quantidade do produto comprada no pedido.
   - **valor_produto:** Valor unitário do produto em centavos.
 
</details>

## 🛣 Endpoints:

<details>
   <summary><b>Listar Categorias</b></summary>

#### `GET` `/categoria`
   Descrição: Essa é a rota que será chamada quando o usuário quiser listar todas as categorias cadastradas no sistema.
  
#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de Resposta (200 OK)**:

```javascript
// HTTP Status 200
[
  {
      id: 1,
      descricao: "Informática"
  },
  {
       id: 2,
       descricao: "Celulares"
  },
];
```
</details>

<details>
   <summary><b>Cadastrar Usuário</b></summary>

#### `POST` `/usuario`
   Descrição: Essa rota é utilizada para cadastrar um novo usuário no sistema.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - nome
  - email
  - senha (mínimo de 3 caracteres)
    
#### **Exemplo de requisição**
```javascript
// POST /usuario
// Corpo da requisição para cadastro de usuário (body)
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "jose"
}
```
#### **Exemplo de Resposta (201 Created)**:

```javascript
// HTTP Status 201 
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```
</details>

<details>
   <summary><b>Login do Usuário</b></summary>

#### `POST` `/login`
   Descrição: Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes): 
  - email
  - senha
    
#### **Exemplo de requisição**

```javascript
// POST /login
// Corpo da requisição para login do usuário (body)
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplo de Resposta (200 OK)**:

```javascript
// HTTP Status 200 
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```
</details>

### 🛡️ Autenticação

Para acessar as funcionalidades a seguir, é necessário incluir um token de autenticação do tipo Bearer nas solicitações. Certifique-se de enviar o token no cabeçalho (header) Authorization em todas as solicitações para estas rotas. O token de autenticação deve ser obtido por meio do processo de login.

<details>
   <summary><b>Detalhar Perfil do Usuário</b></summary>

#### `GET` `/usuario`
   Descrição: Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil. 
   
#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplo de Resposta (200 OK)**:

```javascript
// HTTP Status 200 
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```
</details>

<details>
   <summary><b>Atualizar Usuário</b></summary>

#### `PUT` `/usuario`
   Descrição: Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio perfil.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - nome
  - email
  - senha
    
#### **Exemplo de requisição**
```javascript
// PUT /usuario
// Corpo da requisição para atualizar o usuário (body)
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```
#### **Exemplo de Resposta (204 No Content)**:

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```
</details>

<details>
   <summary><b>Cadastrar Produto</b></summary>

#### `POST` `/produto`
   Descrição: Essa é a rota que permite o usuário logado cadastrar um novo produto no sistema. A requisição deve ser enviada como `multipart/form-data`.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - descricao
  - quantidade_estoque
  - valor
  - categoria_id

  Os seguintes campos são opcionais:
  - produto_imagem (para upload de imagem do produto)
    
#### **Exemplo de requisição**
```javascript
// POST /produto
// Corpo da requisição para cadastro de produto (body)

descricao = Camisa Polo 
quantidade_estoque = 100 
valor = 2599 
categoria_id = 1 
produto_imagem = @caminho/do/arquivo.jpg 

```
#### **Exemplo de Resposta (201 Created)**:

```javascript
// HTTP Status 201 
{
    "id": 1,
    "descricao": "Camisa Polo",
    "quantidade_estoque": 100,
    "valor": 2599,
    "categoria_id": 1
    "produto_imagem": "https://endpoint-bucket/produtos/1/nomeDaImagem.jpg"
}

```

</details>

<details>
   <summary><b>Atualizar Dados do Produto</b></summary>

#### `PUT` `/produto/:id`
   Descrição: Essa é a rota que permite o usuário logado a atualizar as informações de um produto cadastrado. A requisição deve ser enviada como `multipart/form-data`.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - descricao
  - quantidade_estoque
  - valor
  - categoria_id

  Os seguintes campos são opcionais:
  - produto_imagem (para upload de imagem do produto)
    
#### **Exemplo de requisição**
```javascript
// PUT /produto/1
// Corpo da requisição para atualizar o produto (body)

descricao = Camisa Preta 
quantidade_estoque = 50 
valor = 2499 
categoria_id = 2 

```
#### **Exemplo de Resposta (204 No Content)**:

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```
</details>

<details>
   <summary><b>Listar Produtos</b></summary>

#### `GET` `/produto`
   Descrição: Essa é a rota que será chamada quando o usuário logado quiser listar todos os produtos cadastrados. É possível incluir um parâmetro de consulta (query parameter) `categoria_id` para filtrar os produtos por categoria. 
   
#### **Exemplo de requisição**

```javascript
// GET /produto
// ou
// GET /produto?categoria_id=1
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplo de Resposta (200 OK)**:

```javascript
// HTTP Status 200 
[
   {
       "id": 1,
       "descricao": "Camisa Polo",
       "quantidade_estoque": 100,
       "valor": 2599,
       "categoria_id": 1
   },
   {
       "id": 2,
       "descricao": "Camisa Vermelha",
       "quantidade_estoque": 50,
       "valor": 1499,
       "categoria_id": 1
   }
]
```
</details>

<details>
   <summary><b>Detalhar Produto</b></summary>

#### `GET` `/produto/:id`
   Descrição: Essa é a rota que permite o usuário logado obter um de seus produtos cadastrados. 
   
#### **Exemplo de requisição**

```javascript
// GET /produto/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplo de Resposta (200 OK)**:

```javascript
// HTTP Status 200 
{
   "id": 2,
   "descricao": "Camisa Vermelha",
   "quantidade_estoque": 50,
   "valor": 1499,
   "categoria_id": 1
}
```
</details>

<details>
   <summary><b>Excluir Produto por ID</b></summary>

#### `DELETE` `/produto/:id`
   Descrição: Essa é a rota que será chamada quando o usuário logado quiser excluir um de seus produtos cadastrados. 
   
#### **Exemplo de requisição**

```javascript
// DELETE /produto/1
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplo de Resposta (204 No Content)**:

```javascript
// HTTP Status 204 
// Sem conteúdo no corpo (body) da resposta
```
</details>

<details>
   <summary><b>Cadastrar Cliente</b></summary>

#### `POST` `/cliente`
   Descrição: Essa é a rota que permite usuário logado cadastrar um novo cliente no sistema.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - nome
  - email
  - cpf
    
  Os seguintes campos são opcionais:
   - cep 
   - rua
   - numero
   - bairro
   - cidade
   - estado
    
#### **Exemplo de requisição**
```javascript
// POST /cliente
// Corpo da requisição para cadastro de cliente (body)
{
    "nome": "José",
    "email": "jose@email.com",
    "cpf": "11111111111"
}
```
#### **Exemplo de Resposta (201 Created)**:

```javascript
// HTTP Status 201 
{   
    "id": 1,
    "nome": "José",
    "email": "jose@email.com",
    "cpf": "11111111111",
    "cep": null,
    "rua": null,
    "numero": null,
    "bairro": null,
    "cidade": null,
    "estado": null
}
```
</details>

<details>
   <summary><b>Atualizar Dados do Cliente</b></summary>

#### `PUT` `/cliente/:id`
   Descrição: Essa é a rota que permite o usuário realizar atualização de um cliente cadastrado.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - nome
  - email
  - cpf
    
  Os seguintes campos são opcionais:
   - cep 
   - rua
   - numero
   - bairro
   - cidade
   - estado
    
#### **Exemplo de requisição**
```javascript
// PUT /cliente/1
// Corpo da requisição para atualizar cliente (body)
{
    "nome": "José Santos",
    "email": "joseSantos@email.com",
    "cpf": "11111111111"
}
```
#### **Exemplo de Resposta (204 No Content)**:

```javascript
// HTTP Status 204 
// Sem conteúdo no corpo (body) da resposta
```
</details>

<details>
   <summary><b>Listar Clientes</b></summary>

#### `GET` `/cliente`
   Descrição: Essa é a rota que será chamada quando o usuário logado quiser listar todos os clientes cadastrados.
   
#### **Exemplo de requisição**

```javascript
// GET /cliente
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplo de Resposta (200 OK)**:

```javascript
// HTTP Status 200 
[
   {   
       "id": 1,
       "nome": "José Santos",
       "email": "joseSantos@email.com",
       "cpf": "11111111111",
       "cep": null,
       "rua": null,
       "numero": null,
       "bairro": null,
       "cidade": null,
       "estado": null
   },
   {   
       "id": 2,
       "nome": "Maria",
       "email": "maria@email.com",
       "cpf": "11111112222",
       "cep": "12345678",
       "rua": "Rua Nova York",
       "numero": "123",
       "bairro": "Pinheiros",
       "cidade": "São Paulo",
       "estado": "São Paulo"
   }
]
```
</details>

<details>
   <summary><b>Detalhar Cliente</b></summary>

#### `GET` `/cliente/:id`
   Descrição: Essa é a rota que será chamada quando o usuário logado quiser obter um de seus clientes cadastrados.
   
#### **Exemplo de requisição**

```javascript
// GET /cliente/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplo de Resposta (200 OK)**:

```javascript
// HTTP Status 200 
{   
   "id": 2,
   "nome": "Maria",
   "email": "maria@email.com",
   "cpf": "11111112222",
   "cep": "12345678",
   "rua": "Rua Nova York",
   "numero": "123",
   "bairro": "Pinheiros",
   "cidade": "São Paulo",
   "estado": "São Paulo"
}
```
</details>

<details>
   <summary><b>Cadastrar Pedido</b></summary>

#### `POST` `/pedido`
   Descrição: Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  - cliente_id
  - pedido_produtos
     - produto_id
     - quantidade_produto

   Os seguintes campos são opcionais:
  - observacao 
    
#### **Exemplo de requisição**
```javascript
// POST /pedido
// Corpo da requisição para cadastro de pedido (body)
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 1
        },
        {
            "produto_id": 2,
            "quantidade_produto": 1
        }
    ]
}
```
#### **Exemplo de Resposta (201 Created)**:

```javascript
// HTTP Status 201 
{
	"id": 1,
	"cliente_id": 1,
	"observacao": "Em caso de ausência recomendo deixar com algum vizinho",
	"valor_total": 10000
}
```
</details>

<details>
   <summary><b>Listar Pedidos</b></summary>

#### `GET` `/pedido`
   Descrição: Essa é a rota que será chamada quando o usuário logado quiser listar todos os pedidos cadastrados. É possível incluir um parâmetro de consulta (query parameter) `cliente_id` para filtrar os pedidos por clientes. 
   
#### **Exemplo de requisição**

```javascript
// GET /pedido
// ou
// GET /pedido?cliente_id=1
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplo de Resposta (200 OK)**:

```javascript
// HTTP Status 200 
[
    {
        "pedido": {
            "id": 1,
            "valor_total": 10000,
            "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
            "cliente_id": 1
        },
        "pedido_produtos": [
            {
                "id": 1,
                "quantidade_produto": 1,
                "valor_produto": 8000,
                "pedido_id": 1,
                "produto_id": 1
            },
            {
                "id": 2,
                "quantidade_produto": 1,
                "valor_produto": 2000,
                "pedido_id": 1,
                "produto_id": 2
            }
        ]
    }
]
```
</details>




