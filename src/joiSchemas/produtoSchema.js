const joi = require("joi");

module.exports = joi.object({
    descricao: joi.string().required().trim().messages({
        'any.required': 'O campo {{#label}} é obrigatório',
        'string.empty': 'O campo descrição{{#label}} é obrigatório',
        'string.base': 'O campo {{#label}} deve ser do tipo string'
    }),

    quantidade_estoque: joi.number().integer().required().min(0).messages({
        'any.required': 'O campo {{#label}} é obrigatório',
        'number.empty': 'O campo {{#label}} é obrigatório',
        'number.integer': 'O campo {{#label}} deve ser tipo inteiro',
        'number.min': 'O campo {{#label}} não pode ser negativo',
        'number.base':'O campo {{#label}} deve ser um número'

    }),

    valor: joi.number().integer().required().min(1).messages({
        'any.required': 'O campo valor{{#label}} é obrigatório',
        'number.empty': 'O campo {{#label}} é obrigatório',
        'number.integer': 'O valor deve ser do tipo inteiro',
        'number.min': 'O valor do produto não pode ser igual ou menor que zero',
        'number.base':'O campo {{#label}} deve ser um número'
    }),
    categoria_id: joi.number().integer().required().messages({
        'any.required': 'O campo {{#label}} é obrigatório',
        'number.empty': 'O campo {{#label}} é obrigatório',
        'number.integer': 'O campo {{#label}} deve ser do tipo inteiro',
        'number.base':'O campo {{#label}} deve ser um número'
    })
});