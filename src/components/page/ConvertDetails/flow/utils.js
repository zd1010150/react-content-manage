export const mapToStore = (data) => {
  return {
    owner: '',
    opportunityName: data.name,
    withNewOpportunity: false,
    accountStatus: '',
    createAccountName: data.name,
  };
};

export const mapToApi = () => {

};
