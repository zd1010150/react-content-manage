import React, { Fragment } from 'react';
import EditableTable from './EditableTable';
import SummaryTable from './SummaryTable';
import ItemInfo from './ItemInfo';


const ItemDetails = () => (
  <Fragment>
    <EditableTable />
    <SummaryTable />
    <ItemInfo />
  </Fragment>
);


export default ItemDetails;
