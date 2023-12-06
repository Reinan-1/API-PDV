const db = require("../servicos/banco-dados");

module.exports = {
    createCliente: async (req, res) => {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

        const cpfEhValido = Number(cpf);

        if (isNaN(cpfEhValido)) return res.status(400).json({ mensagem: "Cpf inválido" });

        try {

            const [emailExists, cpfExists] = await Promise.all([
                db.isEmailAlreadyRegisteredInClientes(email),
                db.isCPFAlreadyRegistered(cpf)
            ]);

            if (emailExists) return res.status(400).json({ mensagem: "O email informado já está registrado no sistema." });

            if (cpfExists) return res.status(400).json({ mensagem: "O cpf informado já está registrado no sistema." });

            const cliente = await db.createCliente({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado });

            return res.status(201).json(cliente);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }
    }
}