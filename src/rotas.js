const { getCategorias } = require("./controladores/categoria");
const usuario = require("./controladores/usuario");

const validateRequest = require("./intermediarios/validateRequest");

const usuarioSchema = require("./joiSchemas/usuarioSchema");

const rotas = require("express").Router();

rotas.get("/categoria", getCategorias);

rotas.post("/usuario", validateRequest(usuarioSchema), usuario.createUsuario);

module.exports = rotas;