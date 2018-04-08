/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Search = Input.Search;
class FieldMappingInput extends React.Component {
  render() {
    const {
      field, fields, onSearch, onClick, onBlur, isEditing, disabled,
    } = this.props;

    const value = _.isEmpty(fields) ? '' : fields.reduce((labelStr, f) => labelStr += `${f.field_label},`, '');
    return (
      <div>
        {
            (isEditing && !disabled) ?
              <Search readOnly onSearch={() => onSearch(field, fields)} onClick={() => onClick(field, fields)} onBlur={() => onBlur(field, fields)} value={value} />
                :
                value
        }
      </div>
    );
  }
}
FieldMappingInput.defaultProps = {
  onSearch: () => {},
  onClick: () => {},
  onBlur: () => {},
  disabled: false,
};
FieldMappingInput.propTypes = {
  onSearch: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  isEditing: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default FieldMappingInput;

