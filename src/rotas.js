const { getCategorias } = require("./controladores/categoria");
const usuario = require("./controladores/usuario");
const produto = require("./controladores/produto");
const cliente = require("./controladores/cliente");

const validateRequest = require("./intermediarios/validateRequest");
const validateToken = require("./intermediarios/validateToken");
const routeNotFound = require("./intermediarios/routeNotFound");
const multer = require("./intermediarios/multer");

const usuarioSchema = require("./joiSchemas/usuarioSchema");
const loginSchema = require("./joiSchemas/loginSchema");
const produtoSchema = require("./joiSchemas/produtoSchema");
const clienteSchema = require("./joiSchemas/clienteSchema");

const rotas = require("express").Router();

rotas.get("/categoria", getCategorias);

rotas.post("/usuario", validateRequest(usuarioSchema), usuario.createUsuario);

rotas.post("/login", validateRequest(loginSchema), usuario.loginUsuario);

rotas.use(validateToken);

rotas.get("/usuario", usuario.getPerfil);

rotas.put("/usuario", validateRequest(usuarioSchema), usuario.updateUsuario);

rotas.post("/produto", multer.single("produto_imagem"), validateRequest(produtoSchema), produto.createProduto);

rotas.put("/produto/:id", multer.single("produto_imagem"), validateRequest(produtoSchema), produto.updateProduto);

rotas.get("/produto", produto.getProdutos);

rotas.get("/produto/:id", produto.getProdutoByID);

rotas.delete("/produto/:id", produto.deleteProduto);

rotas.post("/cliente", validateRequest(clienteSchema), cliente.createCliente);

rotas.put("/cliente/:id", validateRequest(clienteSchema), cliente.updateCliente);

rotas.get("/cliente", cliente.getClientes);

rotas.use(routeNotFound)

module.exports = rotas;