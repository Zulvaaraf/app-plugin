const { NotePayloadSchema } = require('./schema');

const NotesValidator = (payload) => {
  const validationResult = NotePayloadSchema.validate(payload);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
};

module.exports = NotesValidator;
