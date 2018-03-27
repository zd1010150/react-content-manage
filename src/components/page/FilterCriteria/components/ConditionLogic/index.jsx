import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { FloatingLabelInput } from 'components/ui/index';

const propTypes = {
  intl: intlShape.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

const ConditionLogic = ({ intl, ...others }) => {
  const i18nPrefix = 'page.filterCriteria';
  const { formatMessage } = intl;

  return (
    <FloatingLabelInput
      labelText={formatMessage({ id: `${i18nPrefix}.inputs.condition`})}
      labelColor="#4e4e4e"
      {...others}
    />
  );
};

ConditionLogic.propTypes = propTypes;
export default injectIntl(ConditionLogic);