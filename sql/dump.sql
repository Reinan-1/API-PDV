-- Primeiro crie este banco de dados
CREATE DATABASE pdv;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

-- Inicie a tabela inserindo os seguintes valores.
INSERT INTO categorias 
(descricao)
VALUES
('Informática'), 
('Celulares'), 
('Beleza e Perfumaria'), 
('Mercado'), 
('Livros e Papelaria'),
('Brinquedos'), 
('Moda'), 
('Bebê'), 
('Games');

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id),
    produto_imagem TEXT
);
