import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Icon, Row, Col } from 'antd';
import { ItemList, CardContainer } from 'components/ui/index';

const defaultProps = {};
const propTypes = {

};

class FieldsSelection extends Component {
  addToSelection = () => {
    console.log('move to right');
  }

  removeFromSelection = () => {
    console.log('move to left');
  }

  render() {
    const colLayout = {
      xs: 24,
      sm: 10,
    };

    return (
      <Row>
        <Col {...colLayout}>
          <ItemList />
        </Col>
        <Col sm={2} xs={24} style={{ marginTop: 60, textAlign: 'center' }}>
          <div>
          <Button onClick={this.addToSelection} >
            <Icon type="arrow-right" size="small" />
          </Button>
          </div>
          <div>
          <Button onClick={this.removeFromSelection} >
            <Icon type="arrow-left" size="small" />
          </Button>
          </div>
        </Col>
        <Col {...colLayout}>
          <h3>Selected Fields</h3>
          <CardContainer />
        </Col>
      </Row>
    );
  }
}

FieldsSelection.defaultProps = defaultProps;
FieldsSelection.propTypes = propTypes;
const mapStateToProps = ({ global, }) => ({
  language: global.language,
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(FieldsSelection);