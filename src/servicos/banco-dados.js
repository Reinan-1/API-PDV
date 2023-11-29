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
    getCategorias: async () => knex("categorias"),

    isEmailAlreadyRegistered: async (email, id = null) => knex("usuarios").select("email").where({ email }).whereNot({ id }).first(),

    createUsuario: async ({ nome, email, senha }) => {
        const [usuario] = await knex("usuarios").insert({ nome, email, senha }).returning(["id", "nome", "email"]);

        return usuario;
    },

    getUsuarioCredencial: async email => knex("usuarios").where({ email }).first(),

    getUsuarioByID: async id => knex("usuarios").select(["id", "nome", "email"]).where({ id }).first(),

    updateUsuario: async ({id, nome, email, senha}) => {
        await knex("usuarios").where({id}).update({nome, email, senha});
    }
}