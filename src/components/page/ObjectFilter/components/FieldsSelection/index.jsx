import { Button, Col, Icon, Row, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { CardContainer } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import styles from '../index.less';
import { addToSelection, removeFromSelection, setNewOrder } from './flow/actions';

const cx = classNames.bind(styles);


const propTypes = {
  intl: intlShape.isRequired,
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
  handleDropInAvailable = () => {}

  handleDropInSelection = sortedArray => this.props.setNewOrder(sortedArray)

  render() {
    const colLayout = {
      xs: 24,
      sm: 10,
    };

    const { intl, theme, availableFields, selectedFields } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.objectFilter.selectors.sectionTitles';
    
    const cardTitle = (
      <Fragment>
        {formatMessage({ id: `${i18n}.selected` })}
        <Tooltip title={formatMessage({ id: 'global.ui.dialog.multipleDnd' })}>
          <Icon className="font-sm ml-sm" type="info-circle-o" />
        </Tooltip>
      </Fragment>
    );

    return (
      <Row>
        <Col {...colLayout}>
          <CardContainer
            title={formatMessage({ id: `${i18n}.available` })}
            data={availableFields}
            theme={theme}
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
            title={cardTitle}
            data={selectedFields}
            theme={theme}
            onSelect={this.onSelectIds}
            onDrop={this.handleDropInSelection}
            cardDisplayField="field_label"
          />
        </Col>
      </Row>
    );
  }
}


FieldsSelection.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  language: global.language,
  availableFields: objectView.fields.availableFields,
  selectedFields: objectView.fields.selectedFields,
});
const mapDispatchToProps = {
  addToSelection,
  removeFromSelection,
  setNewOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FieldsSelection));
