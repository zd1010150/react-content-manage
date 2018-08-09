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

const getRelateToId = value => value.split('__')[1];
const getRelatedToType = value => value.split('__')[0];

export const toApi = data => ({
  status: data.status,
  invoice_able_id: Number(getRelateToId(data.relatedTo)),
  invoice_able_type: getRelatedToType(data.relatedTo),
  description: data.description,
});

export const formatInfo = data => ({
  status: data.status,
  description: data.description,
  relatedTo: `${data.invoice_able_type}__${data.invoice_able_id}`,
  lastModifiedAt: '',
  lastModifiedBy: '',
});
