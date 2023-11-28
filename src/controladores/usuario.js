const bcrypt = require("bcrypt");
const db = require("../servicos/banco-dados");
const jwt = require("../servicos/jwt");

module.exports = {
    createUsuario: async (req, res) => {
        const { nome, email, senha } = req.body;

        try {
            const emailExists = await db.isEmailAlreadyRegistered(email);

            if (emailExists) return res.status(400).json({ "mensagem": "O email informado já está registrado no sistema." });

            const encryptedSenha = await bcrypt.hash(senha, 10);

            const usuario = await db.createUsuario({ nome, email, encryptedSenha });

            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Erro interno do servidor." });
        }
    },

    loginUsuario: async (req, res) => {
        const { email, senha } = req.body;

        try {
            const usuarioExists = await db.getUsuarioCredencial(email);

            if (!usuarioExists) return res.status(401).json({ "mensagem": "E-mail e/ou senha inválido(s)." });

            const senhaValida = await bcrypt.compare(senha, usuarioExists.senha);

            if (!senhaValida) return res.status(401).json({ "mensagem": "E-mail e/ou senha inválido(s)." });

            const token = jwt.createToken({ id: usuarioExists.id });

            const { senha: _, ...usuarioLogado } = usuarioExists;

            return res.status(200).json({ usuario: usuarioLogado, token });

        } catch (error) {

            return res.status(500).json({ "mensagem": "Erro interno do servidor." })
        }
    }
}