const fs = require("fs/promises");
const handlebars = require("handlebars");

module.exports = {
    compiladorHtml: async (arquivo, contexto) => {
        const html = await fs.readFile(arquivo);
        const compilador = handlebars.compile(html.toLocaleString());
        return compilador(contexto);
    }
} 
