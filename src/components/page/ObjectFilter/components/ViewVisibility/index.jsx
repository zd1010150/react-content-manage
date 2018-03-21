import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Radio } from 'antd';
const RadioGroup = Radio.Group;

import { UsersList } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
import { setVisibilityOption } from './flow/actions';

const defaultProps = {
  theme: 'lead',
  assignOptions: [],
  selectedOption: Enums.ViewVisibilityIds.Me,
};
const propTypes = {
  theme: PropTypes.string.isRequired,
  assignOptions: PropTypes.array.isRequired,
  selectedOption: PropTypes.number.isRequired,
};

class ViewVisibility extends Component {
  onOptionChange = e => {
    this.props.setVisibilityOption(Number(e.target.value));
  }

  render() {
    const { assignOptions, theme, selectedOption } = this.props;

    return (
      <Fragment>
        <RadioGroup onChange={this.onOptionChange} value={selectedOption} >
          {assignOptions.map(option => (
            <Radio
              key={option.id}
              value={option.id}
              style={{ display: 'block', lineHeight: '24px' }}
              className={`${theme}-theme-radio`}
            >
              {option.display_value}
            </Radio>
          ))}
        </RadioGroup>
        {selectedOption === Enums.ViewVisibilityIds.GroupsAndUsers && (
          <div>acc
            <UsersList
              title="testing"
              withFilter
            />
          </div>
        )}
      </Fragment>
    );
  }
}

ViewVisibility.defaultProps = defaultProps;
ViewVisibility.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  assignOptions: global.settings.assignOptions,
  selectedOption: objectView.visibilities.selectedOption,
});
const mapDispatchToProps = {
  setVisibilityOption,
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewVisibility);