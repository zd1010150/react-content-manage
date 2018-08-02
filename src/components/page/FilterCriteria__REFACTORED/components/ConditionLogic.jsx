import { ErrorText, FloatingLabelInput } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setLogic } from '../flow/actions';
import { validateLogic } from '../utils/compUtils';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  logic: PropTypes.string.isRequired,
  criteria: PropTypes.array.isRequired,
};

class ConditionLogic extends Component {
  // NOTES: What we did here is to update logic on criteria values' change.
  //        In this way, this logic change can be isolated from actions triggered by other components, e.g. add a new criterion.
  componentDidUpdate() {
    const { criteria, logic, setLogic } = this.props;
    if (criteria.length < 1 && logic) {
      setLogic('');
    } else if (criteria.length === 1 && !logic) {
      setLogic('1');
    }
  }

  handleLogicChange = newLogic => this.props.setLogic(newLogic)

  render() {
    const { intl, logic, criteria } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.FilterCriteria__REFACTORED';
    
    const result = validateLogic(logic, criteria);

    return (
      <Fragment>
        <FloatingLabelInput
          labelText={formatMessage({ id: `${i18n}.logic` })}
          labelColor="#4e4e4e"
          handleChange={this.handleLogicChange}
          value={logic}
        />
        {result.length < 1 ? null : <ErrorText intlId={result[0].errorId} />}
      </Fragment>
    );
  }
}

ConditionLogic.defaultProps = defaultProps;
ConditionLogic.propTypes = propTypes;
const mapStateToProps = ({ global, FilterCriteria__REFACTORED }) => ({
  language: global.language,
  logic: FilterCriteria__REFACTORED.logic,
  criteria: FilterCriteria__REFACTORED.criteria.criteria,
});
const mapDispatchToProps = {
  setLogic,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ConditionLogic));
