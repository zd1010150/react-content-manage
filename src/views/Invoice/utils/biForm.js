export const formatData = (data) => {
  const {
    bill_to_address,
    bill_to_country,
    bill_to_name,
    bill_to_phone,
  } = data;
  return {
    biName: {
      value: bill_to_name,
    },
    biAddress: {
      value: bill_to_address,
    },
    biCountry: {
      value: bill_to_country,
    },
    biPhone: {
      value: bill_to_phone,
    },
  };
};

export const isBIFormValid = (data) => {
  const keys = Object.keys(data);
  return !keys.some((key) => {
    const field = data[key];
    if (_.isArray(field.errors)) return field.errors.length;
    return false;
  });
};

export const toApi = data => ({
  bill_to_address: data.biAddress.value,
  bill_to_country: data.biCountry.value,
  bill_to_name: data.biName.value,
  bill_to_phone: data.biPhone.value,
});
