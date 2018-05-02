export default (store) => {
  const { sections } = store.clientDetails.details;
  const requestBody = {};
  sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.value !== field.initialValue) {
        requestBody[field.name] = field.value;
      }
    });
  });
  console.log('---====PRINT BODY====---');
  console.dir(requestBody);
  return requestBody;
};
