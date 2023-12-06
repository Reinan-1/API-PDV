const joi = require('joi');

module.exports = joi.object({
    nome: joi.string().required().trim().messages({
        'any.required': 'O campo {{#label}} é obrigatório',
        'string.empty': 'O campo {{#label}} é obrigatório',
        'string.base': 'Nome informado de forma incorreta'
    }),

    email: joi.string().email().trim().required().messages({
        'any.required': 'O campo {{#label}} é obrigatório',
        'string.empty': 'O campo {{#label}} é obrigatório',
        'string.email': 'O campo informado não configura um email válido',
    }),

    cpf: joi.string().regex(/^\d{11}$/).required().messages({
        'any.required': 'O campo {{#label}} é obrigatório',
        'string.empty': 'O campo {{#label}} é obrigatório',
        'string.base': 'Cpf informado de forma incorreta',
        'string.pattern.base': 'CPF deve conter exatamente 11 dígitos numéricos',
    }), 
    
    cep: joi.string().regex(/^\d{8}$/).trim().messages({
        'string.base': 'Cep informado de forma incorreta',
        'string.min': "Cep inválido",
        'string.max': "Cep inválido",
        'string.pattern.base': 'Cep deve conter exatamente 8 dígitos numéricos',
    }), 
    
    rua: joi.string().trim().messages({
        'string.base': 'Rua informada de forma incorreta'
    }), 
    
    numero: joi.string().regex(/^\d+$/).trim().messages({
        'string.base': 'Número informado de forma incorreta',
        'string.pattern.base': 'O campo {{#label}} deve conter apenas dígitos numéricos',
    }), 
    
    bairro: joi.string().trim().messages({
        'string.base': 'Bairro informado de forma incorreta'
    }), 
    
    cidade: joi.string().trim().messages({
        'string.base': 'Cidade informada de forma incorreta'
    }), 
    
    estado: joi.string().trim().messages({
        'string.base': 'Estado informado de forma incorreta'
    })
});
