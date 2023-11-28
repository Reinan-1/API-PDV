const joi = require("joi");

module.exports = joi.object({
    nome: joi.string().trim().required().messages({
        "any.required": "O campo {{#label}} é obrigatório.",
        "string.empty": "O campo {{#label}} não pode estar vazio.",
        "string.base": "Nome deve ser uma string válida."
    }),

    email: joi.string().email().trim().required().messages({
        "any.required": "O campo {{#label}} é obrigatório.",
        "string.empty": "O campo {{#label}} não pode estar vazio.",
        "string.email": "O campo fornecido não é um e-mail válido."
    }),

    senha: joi.string().trim().required().min(1).messages({
        "any.required": "O campo {{#label}} é obrigatório.",
        "string.empty": "O campo {{#label}} não pode estar vazio.",
        "string.base": "A senha deve ser uma string válida.",
        "string.min": "A senha deve ter no mínimo {{#limit}} caracteres."
    })
});