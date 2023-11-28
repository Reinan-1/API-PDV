require("dotenv").config();
const express = require("express");

const rotas = require("./rotas");

const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(rotas);

app.listen(porta);