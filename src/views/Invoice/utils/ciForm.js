export const formatData = (data) => {
  const {
    bill_from_address,
    bill_from_country,
    bill_from_name,
    bill_from_phone,
  } = data;
  return {
    ciName: {
      value: bill_from_name,
    },
    ciAddress: {
      value: bill_from_address,
    },
    ciCountry: {
      value: bill_from_country,
    },
    ciPhone: {
      value: bill_from_phone,
    },
  };
};

export const isCIFormValid = (data) => {
  const keys = Object.keys(data);
  return !keys.some((key) => {
    const field = data[key];
    if (_.isArray(field.errors)) return field.errors.length;
    return false;
  });
};
