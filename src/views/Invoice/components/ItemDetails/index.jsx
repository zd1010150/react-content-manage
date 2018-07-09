import React, { Fragment } from 'react';
import EditableTable from './EditableTable';
import SummaryTable from './SummaryTable';
import ItemInfo from './ItemInfo';
import Uploader from './Uploader';

const ItemDetails = () => (
  <Fragment>
    <Uploader />
    <EditableTable />
    <SummaryTable />
    <ItemInfo />
  </Fragment>
);


export default ItemDetails;
