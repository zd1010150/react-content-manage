import { OBJECT_TYPES } from 'config/app.config';

const { leads, accounts, opportunities } = OBJECT_TYPES;

export const objectTypeRelations = { // define the relationship
  [leads]: {
    to: [accounts, opportunities],
    from: [],
  },
  [accounts]: {
    from: [leads],
    to: [opportunities],
  },
  [opportunities]: {
    from: [leads, accounts],
    to: [],
  },
};
