const joi = require('@hapi/joi');

const schema = {
    lat: joi.string().required(),
    lon: joi.string().required(),
    liga: joi.string().required(),
    idUsuario: joi.string().required(),
    idEvento: joi.number().optional()
}

exports.schema= schema;
