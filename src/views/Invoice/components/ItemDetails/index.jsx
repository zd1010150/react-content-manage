import React, { Fragment } from 'react';
import SummaryTable from './SummaryTable';
import ItemInfo from './ItemInfo';
import Uploader from './Uploader';

import { ItemsList } from '../index';

const ItemDetails = () => (
  <Fragment>
    <Uploader />
    <ItemsList />
    <SummaryTable />
    <ItemInfo />
  </Fragment>
);


export default ItemDetails;
