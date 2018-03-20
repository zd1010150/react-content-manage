/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { FloatingLabelInput } from 'components/ui/index';


class Add extends React.Component {
  add() {
    const { setAddVisible, resetNewDepartment } = this.props;
    const { name, parentId } = this.props.newTeam;
    this.props.addDepartment(name, parentId, () => {
      setAddVisible(false);
      resetNewDepartment();
    });
  }
  canceal() {
    const { setAddVisible, resetNewDepartment } = this.props;
    setAddVisible(false);
    resetNewDepartment();
  }
  onSearchableInputChange(value) {
    this.props.setNewDepartName(value);
  }
  render() {
    const { intl, selectedTeamName } = this.props;
    const { formatMessage } = intl;
    return (
      <div>
        <h4>{formatMessage({ id: 'page.organChart.addNewTip' }, { department: selectedTeamName })}</h4>
        <FloatingLabelInput
          labelText={formatMessage({ id: 'page.organChart.inputDeaprmentPlaceHolder' })}
          handleChange={value => this.onSearchableInputChange(value)}
          addonAfter={<span> <Icon type="save" className="danger pr-sm" onClick={() => { this.add(); }} /> <Icon type="close" onClick={() => { this.canceal(); }} /></span>}
        />
      </div>

    );
  }
}
Add.defaultProps = {
  secondInputText: '',
};
Add.propTypes = {
  intl: intlShape.isRequired,
  newTeam: PropTypes.object.isRequired,
  setNewDepartName: PropTypes.func.isRequired,
  addDepartment: PropTypes.func.isRequired,
  setAddVisible: PropTypes.func.isRequired,
  resetNewDepartment: PropTypes.func.isRequired,
  selectedTeamName: PropTypes.string.isRequired,
};

export default injectIntl(Add);
