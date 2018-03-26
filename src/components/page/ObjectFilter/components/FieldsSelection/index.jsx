import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../index.less';
const cx = classNames.bind(styles);

import { Button, Icon, Row, Col } from 'antd';
import { CardContainer } from 'components/ui/index';
import { addToSelection, removeFromSelection, setNewOrder } from './flow/actions';

const defaultProps = {
  availableFields: [],
  selectedFields: [],
};
const propTypes = {
  availableFields: PropTypes.array.isRequired,
  selectedFields: PropTypes.array.isRequired,
};

class FieldsSelection extends Component {
  state = {
    selectedFields: [],
  }

  onSelectIds = selectedFields => this.setState({ selectedFields })

  addToSelection = () => this.props.addToSelection(this.state.selectedFields)

  removeFromSelection = () => this.props.removeFromSelection(this.state.selectedFields)

  // TODO: Add new prop passing to CardContainer in order to disable the sorting
  handleDropInAvailable = sortedArray => {}

  handleDropInSelection = sortedArray => this.props.setNewOrder(sortedArray)

  render() {
    const colLayout = {
      xs: 24,
      sm: 10,
    };

    const { availableFields, selectedFields } = this.props;
    
    return (
      <Row>
        <Col {...colLayout}>
          <CardContainer
            title="Available Fields"
            data={availableFields}
            theme={'lead'}
            onSelect={this.onSelectIds}
            onDrop={this.handleDropInAvailable}
            cardDisplayField="field_label"
          />
        </Col>
        <Col sm={2} xs={24} className={cx('moveBtnContainer')} >
          <Button className={cx('moveBtn')} onClick={this.addToSelection}>
            <Icon type="arrow-right" size="small" />
          </Button>
          <br />
          <Button className={cx('moveBtn')} onClick={this.removeFromSelection}>
            <Icon type="arrow-left" size="small" />
          </Button>
        </Col>
        <Col {...colLayout}>
          <CardContainer
            title="Selected Fields"
            data={selectedFields}
            theme={'lead'}
            onSelect={this.onSelectIds}
            onDrop={this.handleDropInSelection}
            cardDisplayField="field_label"
          />
        </Col>
      </Row>
    );
  }
}

FieldsSelection.defaultProps = defaultProps;
FieldsSelection.propTypes = propTypes;
const mapStateToProps = ({ global, objectView, }) => ({
  language: global.language,
  availableFields: objectView.fields.availableFields,
  selectedFields: objectView.fields.selectedFields,
});
const mapDispatchToProps = {
  addToSelection,
  removeFromSelection,
  setNewOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(FieldsSelection);