const joi = require('@hapi/joi');

const post = {
    phone: joi.number().required(),
    name: joi.string().required(),
    uid: joi.string().required()
}
const put = {
    old_phone: joi.number().required(),
    phone: joi.string().required(),
    name: joi.string().required()
}

exports.schema = {
    post,
    put
};