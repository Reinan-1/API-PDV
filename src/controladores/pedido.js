const db = require("../servicos/banco-dados");
const { enviarConfirmacaoPedido } = require("../utils/enviarConfirmacaoPedido");

module.exports = {
    createPedido: async (req, res) => {
        const { cliente_id, observacao, pedido_produtos } = req.body;

        try {
            const clienteExists = await db.getClienteByID(cliente_id);

            if (!clienteExists) return res.status(404).json({ "mensagem": "Cliente não encontrado." });

            const produtosAgrupados = agruparProdutos(pedido_produtos);

            let valor_total = 0;

            for (const produto of produtosAgrupados) {
                const id = produto.produto_id;

                const produtoExists = await db.getProdutoByID(id);

                if (!produtoExists) return res.status(404).json({ "mensagem": `Produto de ID ${id} não encontrado.` });

                if (produtoExists.quantidade_estoque < produto.quantidade_produto) {
                    return res.status(400).json({ "mensagem": `Produto de ID ${id} fora de estoque.` });
                }

                produto.valor = produtoExists.valor;

                valor_total += produto.valor * produto.quantidade_produto;
            }

            await atualizarEstoqueProduto(produtosAgrupados);

            const pedido = await db.createPedido({
                cliente_id,
                observacao,
                valor_total
            });

            const pedidoProdutos = produtosAgrupados.map(produto => {
                return {
                    pedido_id: pedido.id,
                    produto_id: produto.produto_id,
                    quantidade_produto: produto.quantidade_produto,
                    valor_produto: produto.valor
                }
            })

            await db.createPedidoProdutos(pedidoProdutos);

            await enviarConfirmacaoPedido(clienteExists, pedido);

            return res.status(201).json(pedido);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }
    },

    getPedidos: async (req, res) => {
        const cliente_id = Number(req.query.cliente_id);

        try {

            const pedidos = await db.getPedidos(cliente_id);

            if (pedidos.length < 1) {
                return res.status(404).json({ "mensagem": "Não existe pedidos cadastrados para esse cliente." })
            }

            const resultado = mostrarPedidosProdutos(pedidos);

            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ "mensagem": "Ocorreu um erro interno no servidor." });
        }
    }
}

const agruparProdutos = (pedidoProdutos) => {
    const produtosAgrupados = [];

    for (const item of pedidoProdutos) {
        const indexProduto = produtosAgrupados.findIndex((produto) => {
            return produto.produto_id === item.produto_id;
        });

        if (indexProduto === -1) produtosAgrupados.push(item);
        else produtosAgrupados[indexProduto].quantidade_produto += item.quantidade_produto;
    }

    return produtosAgrupados;
};

const atualizarEstoqueProduto = async (produtosAgrupados) => {
    for (const produto of produtosAgrupados) {
        const id = produto.produto_id;

        const { quantidade_estoque } = await db.getProdutoByID(id);

        const novaQuantidade = quantidade_estoque - produto.quantidade_produto;

        await db.updateProduto({ id, quantidade_estoque: novaQuantidade });

    }
};

const mostrarPedidosProdutos = (pedidos) => {
    const resultado = [];

    for (const pedido of pedidos) {
        const existePedido = resultado.find((p) => p.pedido.id === pedido.pedido_id);

        if (!existePedido) {
            resultado.push({
                pedido: {
                    id: pedido.pedido_id,
                    valor_total: pedido.valor_total,
                    observacao: pedido.observacao,
                    cliente_id: pedido.cliente_id
                },
                pedido_produtos: [
                    {
                        id: pedido.id,
                        quantidade_produto: pedido.quantidade_produto,
                        valor_produto: pedido.valor_produto,
                        pedido_id: pedido.pedido_id,
                        produto_id: pedido.produto_id
                    }
                ]
            });
        } else {
            existePedido.pedido_produtos.push({
                id: pedido.id,
                quantidade_produto: pedido.quantidade_produto,
                valor_produto: pedido.valor_produto,
                pedido_id: pedido.pedido_id,
                produto_id: pedido.produto_id
            });
        }
    };
    
    return resultado;
};