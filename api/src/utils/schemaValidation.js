const schemaValidation = (schema, testSchema) => {
  const returningValue = schema.validate(testSchema);

  return error in returningValue ? false : true;
}

module.exports = schemaValidation;
