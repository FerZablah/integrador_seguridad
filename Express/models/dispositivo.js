const joi = require('@hapi/joi');

const schema = {
    idDispositivo: joi.string().required(),
    uid: joi.string().required()
}

exports.schema= schema;