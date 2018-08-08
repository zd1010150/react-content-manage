export const formatRelatedTos = (data, type) => {
  if (!data || !_.isArray(data) || !type) return [];
  
  const filteredData = data.filter(rt => rt.invoice_able_type === type);
  return filteredData.map(rt => ({
    id: `${rt.invoice_able_type}__${rt.invoice_able_id}`,
    type: rt.invoice_able_type,
    name: rt.name,
  }));
};

export const isSecondaryInfoValid = (data) => {
  const keys = ['relatedTo', 'status'];
  return !keys.some((key) => {
    const value = data[key];
    return !value;
  });
};
