const { getCategorias } = require("./controladores/categoria");
const usuario = require("./controladores/usuario");

const validateRequest = require("./intermediarios/validateRequest");
const validateToken = require("./intermediarios/validateToken");

const usuarioSchema = require("./joiSchemas/usuarioSchema");
const loginSchema = require("./joiSchemas/loginSchema");

const rotas = require("express").Router();

rotas.get("/categoria", getCategorias);

rotas.post("/usuario", validateRequest(usuarioSchema), usuario.createUsuario);

rotas.post("/login", validateRequest(loginSchema), usuario.loginUsuario);

module.exports = rotas;