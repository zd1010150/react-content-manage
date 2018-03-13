/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { FloatingLabelInput } from 'components/ui/index';


class Add extends React.Component {
  onSearch() {

  }
  onSearchableInputChange() {

  }
  render() {
    const { secondInputText, intl, department } = this.props;
    const { formatMessage } = intl;
    return (
        <div>
          <h4>{formatMessage({ id: 'page.organChart.addNewTip' }, { department })}</h4>
          <FloatingLabelInput
            labelText={formatMessage({ id: 'page.organChart.inputDeaprmentPlaceHolder' })}
            labelColor="#09c"
            placeholder="Wow, the label is floating too"
            handleChange={this.onSearchableInputChange}
            syncWithRedux={this.onSearch}
            value={secondInputText}
            addonAfter={<span> <Icon type="save" className="danger pr-sm" onClick={() => { alert('save'); }} /> <Icon type="close" onClick={() => { alert('cencel'); }} /></span>}
          />
        </div>

    );
  }
}
Add.defaultProps = {
  secondInputText: '',
};
Add.propTypes = {
  secondInputText: PropTypes.string,
  intl: intlShape.isRequired,
  department: PropTypes.string,
};

export default injectIntl(Add);
