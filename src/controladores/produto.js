const db = require("../servicos/banco-dados");
const { uploadFile } = require("../servicos/storage");

module.exports = {
    createProduto: async (req, res) => {
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

        try {
            const categoriaExists = await db.getCategoriaByID(categoria_id);

            if (!categoriaExists) return res.status(404).json({ "mensagem": "Categoria não encontrada." });

            let produto = await db.createProduto({ descricao, quantidade_estoque, valor, categoria_id });

            if (req.file) {
                const { originalname, buffer, mimetype } = req.file;

                const { id } = produto;

                const { url } = await uploadFile(
                    `produtos/${id}/${originalname}`,
                    buffer,
                    mimetype
                );

                produto = await db.updateProduto({
                    id,
                    descricao,
                    quantidade_estoque,
                    valor,
                    categoria_id,
                    produto_imagem: url
                })

                return res.status(201).json(produto);
            }

            return res.status(201).json(produto);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }

    }
}