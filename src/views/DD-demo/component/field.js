/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';


class field extends React.Component {
  render() {
    const { id, label, isLayoutRequired } = this.props;
    return (
      <div className="field" id={id}>
        {isLayoutRequired ? <span>*</span> : '' }
        {label}
      </div>
    );
  }
}

field.defaultProps = {
  isLayoutRequired: false,
};
field.propTypes = {
  id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isLayoutRequired: PropTypes.bool,
};


export default field;
