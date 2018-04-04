import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Radio, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

import { DeleteConfirmDialog } from 'components/ui/index';

class ReplaceDialog extends React.Component {
  submitReplace() {
    this.props.submitReplace(this.props.selectedOption);
  }
  cancelReplace() {
    this.props.setReplaceDialog({ isVisible: false });
  }
  replacedChangeVal(val) {
    this.props.setReplaceDialog({ selectedOption: val });
  }
  render() {
    const {
      options, selectedOption, isVisible, intl,
    } = this.props;
    const { formatMessage } = intl;

    const deleteFooter = [
      <Button
        key="cancel"
        type="default"
        icon="close"
        size="small"
        onClick={() => this.cancelReplace()}
      >{ formatMessage({ id: 'global.ui.button.cancel' })}
      </Button>,
      <Button
        key="save"
        size="small"
        type="danger"
        icon="save"
        onClick={() => this.submitReplace()}
      >{ formatMessage({ id: 'global.ui.button.replace' })}
      </Button>];
    return (
      <DeleteConfirmDialog visible={isVisible} modelConfig={{ footer: deleteFooter }}>
          <div>
            <p>please select a value to replace</p>
            <Row>
              {
                options.map(val => (
                  <Col span={24} key={val.id}>
                    <Radio
                      checked={`${selectedOption.id}` === `${val.id}`}
                      value={val.id}
                      onChange={() => this.replacedChangeVal(val)}
                    >
                      { val.option_value }
                    </Radio>
                  </Col>
                        ))
              }
            </Row>
            <p className="error-msg">Change can take up to 5 mins to become effective.</p>
          </div>
      </DeleteConfirmDialog>


    );
  }
}

ReplaceDialog.propTypes = {
  intl: intlShape.isRequired,
  isVisible: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.object.isRequired,
  setReplaceDialog: PropTypes.func.isRequired,
  submitReplace: PropTypes.func.isRequired,
};
export default injectIntl(ReplaceDialog);

