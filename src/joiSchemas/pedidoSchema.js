const joi = require('joi');

module.exports = joi.object({
    cliente_id: joi.number().integer().required().messages({
        'any.required': 'O campo {{#label}} é obrigatório',
        'number.empty': 'O campo {{#label}} é obrigatório',
        'number.integer': '{{#label}} deve ser um número',
        'number.base': 'O campo {{#label}} deve ser um número'
    }),

    observacao: joi.string().trim().messages({
        'string.base': 'O campo {{#label}} deve ser do tipo string'
    }),

    pedido_produtos: joi.array()
        .required()
        .min(1)
        .items(
            joi.object({
                produto_id: joi.number().integer().required().messages({
                    'any.required': 'O campo {{#label}} é obrigatório',
                    'number.empty': 'O campo {{#label}} é obrigatório',
                    'number.base': '{{#label}} deve ser um número',
                    'number.integer': '{{#label}} deve ser um número'
                }),

                quantidade_produto: joi.number().integer().required().min(1).messages({
                    'any.required': 'O campo {{#label}} é obrigatório',
                    'number.empty': 'O campo {{#label}} é obrigatório',
                    'number.base': '{{#label}} deve ser um número',
                    'number.integer': 'O campo {{#label}} deve ser tipo inteiro',
                    'number.min': 'O campo {{#label}} não pode ser igual ou menor que zero'
                }),
            })
        )
        .messages({
            'any.required': 'O campo {{#label}} é obrigatório',
            'array.empty': 'O campo {{#label}} é obrigatório',
            'array.min': 'O campo {{#label}} precisa ser um array com pelo menos um produto',
            'array.base': 'O campo {{#label}} deve ser um array',
            'object.base': 'Os itens do array devem ser do tipo objeto'
        })
});
