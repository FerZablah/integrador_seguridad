const joi = require('@hapi/joi');

const schema = {
    uid: joi.string().required(),
    phone: joi.string().required(),
    name: joi.string().required(),
    mail: joi.string().required()
}

exports.schema= schema;