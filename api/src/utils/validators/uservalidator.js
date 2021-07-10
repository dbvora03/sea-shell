/* eslint-disable max-len */
const Joi = require('joi');

const userValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().pattern(
      new RegExp(
          // eslint-disable-next-line quotes
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
      )).required(),
  password: Joi.string().required(),

});


module.exports = userValidator;
