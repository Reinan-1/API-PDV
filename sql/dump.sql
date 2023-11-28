-- Primeiro crie este banco de dados
CREATE DATABASE pdv;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY;
    descricao TEXT NOT NULL;
);

-- Inicie a tabela inserindo os seguintes valores.
insert into categorias 
(descricao)
values
('Informática'), 
('Celulares'), 
('Beleza e Perfumaria'), 
('Mercado'), 
('Livros e Papelaria'),
('Brinquedos'), 
('Moda'), 
('Bebê'), 
('Games');