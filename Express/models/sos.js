const joi = require('@hapi/joi');

const schema = {
    lat: joi.string().required(),
    lon: joi.string().required()
}

exports.schema= schema;
