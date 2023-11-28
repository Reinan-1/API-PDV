const bcrypt = require("bcrypt");
const db = require("../servicos/banco-dados");

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

    }
}