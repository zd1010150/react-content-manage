export const LEADS = 'leads';
export const ACCOUNTS = 'accounts';
export const OPPORTUNITIES = 'opportunities';
export const objectTypeRelations = { // define the mapping
  [LEADS]: {
    to: [ACCOUNTS, OPPORTUNITIES],
  },
  [ACCOUNTS]: {
    from: [LEADS],
    to: [OPPORTUNITIES],
  },
  [OPPORTUNITIES]: {
    from: [LEADS, ACCOUNTS],
  },
};
