const { enviarEmail } = require("../servicos/email");
const {compiladorHtml} = require("./compiladorHtml");

module.exports = {
    enviarConfirmacaoPedido: async (cliente, pedido) => {
        const html = await compiladorHtml("./src/templates/confirmacao-pedido.html", {
            nomecliente: cliente.nome,
            id: pedido.id,
            valor: (pedido.valor_total / 100).toFixed(2)
        });

        enviarEmail(cliente, html, "Confirmação do Pedido");
    }
}