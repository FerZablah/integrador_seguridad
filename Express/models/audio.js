const joi = require('@hapi/joi');

const schema = {
    idEvento: joi.number().required(),
    liga: joi.string().required()
}

exports.schema= schema;