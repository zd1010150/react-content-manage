import { Row } from 'antd';
import React, { Fragment } from 'react';
import { ItemsList, Summary } from '../index';
import ItemInfo from './ItemInfo';
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
      <ItemInfo />
    </Row>
  </Fragment>
);


export default ItemDetails;
