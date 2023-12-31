const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    }
});

module.exports = {
    getCategoriaByID: async id => knex("categorias").where({ id }).first(),

    getCategorias: async () => knex("categorias"),

    isEmailAlreadyRegistered: async (email, id = null) => knex("usuarios").select("email").where({ email }).whereNot({ id }).first(),

    createUsuario: async ({ nome, email, senha }) => {
        const [usuario] = await knex("usuarios").insert({ nome, email, senha }).returning(["id", "nome", "email"]);

        return usuario;
    },

    getUsuarioCredencial: async email => knex("usuarios").where({ email }).first(),

    getUsuarioByID: async id => knex("usuarios").select(["id", "nome", "email"]).where({ id }).first(),

    updateUsuario: async ({ id, nome, email, senha }) => {
        await knex("usuarios").where({ id }).update({ nome, email, senha });
    },

    createProduto: async ({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem }) => {
        const [produto] = await knex("produtos")
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem
            })
            .returning("*");

        return produto;
    },

    updateProduto: async ({ id, descricao, quantidade_estoque, valor, categoria_id, produto_imagem }) => {
        const [produto] = await knex("produtos")
            .where({ id })
            .update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem })
            .returning("*");

        return produto;
    },

    getProdutoByID: async id => knex("produtos").where({ id }).first(),

    getProdutos: async (categoria_id) => {
        const query = knex("produtos")
            .select("produtos.*", "categorias.descricao as categoria_nome")
            .join("categorias", "produtos.categoria_id", "categorias.id")
            .orderBy("produtos.id", "asc");

        if (categoria_id) {
            query.where({ categoria_id });
        }

        const produtos = await query;

        return produtos;
    },

    deleteProduto: async id => knex("produtos").where({ id }).delete(),

    createCliente: async ({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado }) => {
        const [cliente] = await knex("clientes")
            .insert({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            })
            .returning("*");

        return cliente;
    },

    isEmailAlreadyRegisteredInClientes: async (email, id = null) => knex("clientes").select("email").where({ email }).whereNot({ id }).first(),

    isCPFAlreadyRegistered: async (cpf, id = null) => knex("clientes").select("cpf").where({ cpf }).whereNot({ id }).first(),

    getClienteByID: async id => knex("clientes").where({ id }).first(),

    updateCliente: async ({ id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado }) => {
        await knex("clientes")
            .update({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            })
            .where({ id });
    },

    getClientes: async () => knex("clientes").orderBy("id", "asc"),

    createPedido: async ({ cliente_id, observacao, valor_total }) => {
        const [pedido] = await knex("pedidos")
            .insert({
                cliente_id,
                observacao,
                valor_total
            }).returning("*");

        return pedido;
    },

    createPedidoProdutos: async (pedidoProdutos) => {
        await knex("pedido_produtos")
            .insert(pedidoProdutos);
    },

    getPedidos: async (cliente_id) => {
        const query = knex('pedidos')
        .select('pedidos.*', 'pedido_produtos.*')
        .join("pedido_produtos", "pedido_produtos.pedido_id", "pedidos.id")
        .orderBy("pedidos.id", "asc");

        if (cliente_id) {
            query.where({ cliente_id });
        }

        const pedidos = await query;

        return pedidos;
    }
}