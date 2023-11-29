const db = require("../servicos/banco-dados");

module.exports = {

    getCategorias: async (req, res) => {
        try {
            const categorias = await db.getCategorias();

            return res.json(categorias);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }
    }
}