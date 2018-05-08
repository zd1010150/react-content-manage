import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { ErrorText, FloatingLabelInput } from 'components/ui/index';


const defaultProps = {
  handleChange: null,
};
const propTypes = {
  intl: intlShape.isRequired,
  handleChange: PropTypes.func,
  hasError: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const ConditionLogic = ({ intl, hasError, ...others }) => {
  const i18nPrefix = 'page.filterCriteria';
  const { formatMessage } = intl;

  return (
    <Fragment>
      <FloatingLabelInput
        labelText={formatMessage({ id: `${i18nPrefix}.inputs.condition` })}
        labelColor="#4e4e4e"
        {...others}
      />
      {hasError && <ErrorText intlId="global.errors.missFilter" />}
    </Fragment>
  );
};


ConditionLogic.defaultProps = defaultProps;
ConditionLogic.propTypes = propTypes;
export default injectIntl(ConditionLogic);
