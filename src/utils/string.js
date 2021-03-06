export const labelToCode = label => label.replace(/\s/g, '') + Math.floor(Math.random() * 1000);
export const toSnakeCase = (str) => {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, '_')
    .toLowerCase();
};

