import { Row, Col } from 'antd';
import React, { Fragment } from 'react';
import { ItemsList, Summary, Upload } from '../index';
import SecondaryInfo from '../SecondaryInfo/index';

const ItemDetails = () => (
  <Fragment>
    <Row className="mb-lg">
      <ItemsList />
    </Row>
    <Row className="mb-lg">
      <Summary />
    </Row>
    <Row className="mb-lg">
      <Col xs={24} sm={8}>
        <Upload />
      </Col>
    </Row>
    <Row>
      <SecondaryInfo />
    </Row>
  </Fragment>
);


export default ItemDetails;
