/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { FloatingLabelInput } from 'components/ui/index';


class Add extends React.Component {
  onSearch() {

  }
  onSearchableInputChange() {

  }
  render() {
    const { secondInputText } = this.props;
    return (

      <FloatingLabelInput
        labelText="Click to release me"
        labelColor="#09c"
        placeholder="Wow, the label is floating too"
        handleChange={this.onSearchableInputChange}
        syncWithRedux={this.onSearch}
        value={secondInputText}
        withSearch
      />

    );
  }
}
Add.defaultProps = {
  secondInputText: '',
};
Add.propTypes = {
  secondInputText: PropTypes.string,
};

export default Add;
