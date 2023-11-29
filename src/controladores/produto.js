const db = require("../servicos/banco-dados");

module.exports = {
    createProduto: async (req, res) => {
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

        try {
            const categoriaExists = await db.getCategoriaByID(categoria_id);

            if(!categoriaExists) return res.status(404).json({"mensagem": "Categoria não encontrada."});
            
            const produto = await db.createProduto({ descricao, quantidade_estoque, valor, categoria_id });

            return res.status(201).json(produto);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." }); 
        }

    }
}