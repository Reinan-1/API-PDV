const db = require("../servicos/banco-dados");
const jwt = require("../servicos/jwt");

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ "mensagem": "É necessário enviar um token de autenticação válido para acessar este recurso." });

    const token = authorization.split(" ")[1];

    try {
        const id = jwt.getUsuario(token);

        const usuario = await db.getUsuarioByID(id);

        if (!usuario) return res.status(401).json({ "mensagem": "É necessário enviar um token de autenticação válido para acessar este recurso." });

        req.usuario = usuario;

        next()
    } catch (error) {

        return res.status(401).json({ "mensagem": "É necessário enviar um token de autenticação válido para acessar este recurso." });
    }
}
