export const mapToStore = data => ({
  ownerId: data.ownership_id.id,
  opportunityName: data.name,
  createAccountName: data.name,
});

// TODO
/** requested format by api
 {
    "account" : {
        "ownership_id": 1,
        "duplicate_id": 5,
        "account_status":4
    },
    "new_opportunity": "NO",
    "opportunity": {
        "name" : "ss"
    },
    ...taskdata
  }
 */
export const mapToApi = data => ({
  account: {
    ownership_id: data.ownerId,
    duplicate_id: data.createAccountNameId,
    account_status: data.accountStatusId,
  },
  new_opportunity: data.withoutNewOpportunity ? 'NO' : 'YES',
  opportunity: {
    name: data.opportunityName,
  },
});
