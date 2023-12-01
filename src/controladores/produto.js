const db = require("../servicos/banco-dados");
const storage = require("../servicos/storage");

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

                const { url } = await storage.uploadFile(
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

    },

    updateProduto: async (req, res) => {
        const produto = req.body;
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({ "mensagem": "ID inválido." });

        produto.id = id;

        try {

            const [categoriaExists, produtoExists] = await Promise.all([
                db.getCategoriaByID(produto.categoria_id),
                db.getProdutoByID(produto.id)
            ]);
            
            if (!categoriaExists) return res.status(404).json({ "mensagem": "Categoria não encontrada." });

            if (!produtoExists) return res.status(404).json({ "mensagem": "Produto não encontrado." });

            if (req.file) {
                const { originalname, buffer, mimetype } = req.file;

                if(produtoExists.produto_imagem){
                    const imageName = produtoExists.produto_imagem.slice(produtoExists.produto_imagem.lastIndexOf('/'));

                    await storage.deleteFile(`produtos/${produtoExists.id}${imageName}`);
                }

                const { url } = await storage.uploadFile(
                    `produtos/${id}/${originalname}`,
                    buffer,
                    mimetype
                );

                produto.produto_imagem = url;
            }

            await db.updateProduto(produto);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }
    }
}