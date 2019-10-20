const joi = require('@hapi/joi');

const schema = {
    idEvento: joi.string().required()
}

exports.schema= schema;