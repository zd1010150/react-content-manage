import React, { Fragment } from 'react';
import SummaryTable from './SummaryTable';
import ItemInfo from './ItemInfo';
import Uploader from './Uploader';

import { ItemsList, Summary } from '../index';

const ItemDetails = () => (
  <Fragment>
    <Summary />
    <Uploader />
    <ItemsList />
    <SummaryTable />
    <ItemInfo />
  </Fragment>
);


export default ItemDetails;
