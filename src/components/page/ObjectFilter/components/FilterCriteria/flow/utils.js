/**
 * Compute new condition logic text based on updated filters and action(add/remove)
 * @param {object} state
 * @param {array} filters
 * @param {bool} hasRemoved
 */
export const getConditionLogic = (state, filters, hasAdded = false) => {
  const { length } = filters;
  // Added the first filter
  if (hasAdded && length === 1) {
    return '1';
  }
  // Deleted the only filter
  if (!hasAdded && length < 1) {
    return '';
  }
  // Deleted the second last filter
  if (!hasAdded && length < 2) {
    return filters[0].displayNum;
  }
  return state.condition_logic;
};
