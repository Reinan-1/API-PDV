const { getCategorias } = require("./controladores/categoria");

const rotas = require("express").Router();

rotas.get("/categoria", getCategorias);

module.exports = rotas;