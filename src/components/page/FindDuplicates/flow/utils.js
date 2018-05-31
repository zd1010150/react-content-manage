const searchKeys = [
  'name',
  'last_name',
  'email',
  'company_name',
  'phone',
];

const concatParams = (data) => {
  const reducer = (accumulator, key) => {
    return (searchKeys.indexOf(key) > -1 && data[key]) ? `${accumulator}${key}=${data[key]}&` : accumulator;
  };
  return searchKeys.reduce(reducer, '');
};

export default concatParams;
