import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

import { StyledModal } from 'components/ui/index';

const defaultProps = {
  data: [],
  selectedData: [],
  visible: false,
};
const propTypes = {
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
      checkedValues: props.selectedData.map(select => select.id),
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('sync with outside.');
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

  handleCheckboxChange = checkedValues => {
    console.log(checkedValues);
    this.setState({ checkedValues });
  }

  render() {
    const { checkedValues } = this.state;
    const { intl, data, visible } = this.props;
    const i18nPrefix = 'page.objectFilter.visibility';

    return (
      <StyledModal
        title={intl.formatMessage({ id: `${i18nPrefix}.buttons.addUserToShare`})}
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <CheckboxGroup onChange={this.handleCheckboxChange} value={checkedValues}>
          <Row>
            {data.map(record => (
              <Col xs={12} key={record.id}>
                <Checkbox value={record.id}>
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