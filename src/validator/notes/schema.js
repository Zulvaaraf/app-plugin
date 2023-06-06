const Joi = require('joi');

const NotePayloadSchema = Joi.object({
  title: Joi.string().required(),
  tags: Joi.string().required(),
  body: Joi.array().items(Joi.string()).required(),
});

module.exports = { NotePayloadSchema };
