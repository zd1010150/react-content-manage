/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class singleField extends React.Component {
  render() {
    const {
      id, label, isLayoutRequired, isSelected,
    } = this.props;
    console.log(...this.props, "====");
    return (
      <div className="field" id={id}>
        <Button disabled={isLayoutRequired || isSelected} id={id}> {label} </Button>
      </div>
    );
  }
}

singleField.defaultProps = {
  isLayoutRequired: false,
    isSelected: false,
};
singleField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLayoutRequired: PropTypes.bool,
  isSelected: PropTypes.bool,
};


export default singleField;
