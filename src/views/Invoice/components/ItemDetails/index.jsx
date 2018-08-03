import { Row } from 'antd';
import React, { Fragment } from 'react';
import { ItemsList, Summary } from '../index';
import SecondaryInfo from '../SecondaryInfo/index';
import Uploader from './Uploader';

const ItemDetails = () => (
  <Fragment>
    <Row className="mb-lg">
      <ItemsList />
    </Row>
    <Row className="mb-lg">
      <Summary />
    </Row>
    <Row className="mb-lg">
      <Uploader />
    </Row>
    <Row className="mb-lg">
      <SecondaryInfo />
    </Row>
  </Fragment>
);


export default ItemDetails;
