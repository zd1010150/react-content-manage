import { Checkbox, Col, Icon, Row } from 'antd';
import classNames from 'classnames/bind';
import { FloatingLabelInput, StyledModal } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import styles from './index.less';

const CheckboxGroup = Checkbox.Group;
const cx = classNames.bind(styles);


const defaultProps = {
  theme: 'lead',
  data: [],
  selectedData: [],
  visible: false,
};
const propTypes = {
  theme: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedData: PropTypes.array.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  visible: PropTypes.bool.isRequired,
};

class SelectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      checkedValues: props.selectedData.map(select => select.id),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ checkedValues: nextProps.selectedData.map(select => select.id) });
  }

  onOk = e => {
    const { onOk } = this.props;
    if (onOk && typeof onOk === 'function') {
      onOk(this.state.checkedValues);
    }
  }

  onCancel = e => {
    const { onCancel } = this.props;
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
  }

  handleSearch = value => this.setState({ searchText: value })

  handleCheckboxChange = checkedValues => this.setState({ checkedValues })

  render() {
    const { searchText, checkedValues } = this.state;
    const { intl, data, visible, theme } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.objectFilter.visibility';

    const filteredData = data.filter(record => record.name.indexOf(searchText) !== -1);

    return (
      <StyledModal
        title={formatMessage({ id: `${i18nPrefix}.buttons.addUserToShare`})}
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <FloatingLabelInput
          labelText={formatMessage({ id: `${i18nPrefix}.modal.searchInput` })}
          labelColor="#4e4e4e"
          placeholder={formatMessage({ id: 'global.ui.input.searchUser' })}
          addonAfter={<Icon type="search" size="small" />}
          handleSearch={this.handleSearch}
          withSearch
        />
        <CheckboxGroup
          onChange={this.handleCheckboxChange}
          value={checkedValues}
          className={cx('checkboxGroup')}
        >
          <Row>
            {filteredData.map(record => (
              <Col xs={12} key={record.id}>
                <Checkbox className={`${theme}-theme-checkbox`} value={record.id}>
                  {record.name}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </CheckboxGroup>
      </StyledModal>
    );
  }
}

SelectionModal.defaultProps = defaultProps;
SelectionModal.propTypes = propTypes;
export default injectIntl(SelectionModal);