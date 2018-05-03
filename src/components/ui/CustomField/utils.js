const getDisplayValue = (selectedId, options, displayKey) => {
  if (!selectedId) return null;
  const target = options.find(option => option.id === selectedId);
  if (!target) return null;
  return target[displayKey];
};

export {
  getDisplayValue,
};
