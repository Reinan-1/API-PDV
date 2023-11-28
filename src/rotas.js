const rotas = require("express").Router();

rotas.get("/", (req, res) => res.json({"mensagem":"tudo ok"}));

module.exports = rotas;