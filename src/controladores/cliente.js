const db = require("../servicos/banco-dados");

module.exports = {
    createCliente: async (req, res) => {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

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
    },

    updateCliente: async (req, res) => {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ "mensagem": "ID inválido." });

        try {

            const clienteExists = await db.getClienteByID(id);

            if (!clienteExists) return res.status(404).json({ mensagem: "Cliente não encontrado." });

            const [emailExists, cpfExists] = await Promise.all([
                db.isEmailAlreadyRegisteredInClientes(email, id),
                db.isCPFAlreadyRegistered(cpf, id)
            ]);

            if (emailExists) return res.status(400).json({ mensagem: "O email informado já está registrado no sistema." });

            if (cpfExists) return res.status(400).json({ mensagem: "O cpf informado já está registrado no sistema." });

            await db.updateCliente({ id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado });

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }
    },

    getClientes: async (req, res) => {
        try {
            const clientes = await db.getClientes();

            return res.json(clientes);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }
    },

    getClienteByID: async (req, res) => {
        const id = Number(req.params.id);

        if (isNaN(id)) return res.status(400).json({ "mensagem": "ID inválido." });

        try {
            const clienteExists = await db.getClienteByID(id);

            if (!clienteExists) return res.status(404).json({ mensagem: "Cliente não encontrado." });

            return res.json(clienteExists);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }
    }
}