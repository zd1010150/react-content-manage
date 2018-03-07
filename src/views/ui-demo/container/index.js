/* eslint-disable no-shadow */
import React from 'react';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import Panels from '../component/panels';
import Buttons from '../component/buttons';
import Checkboxes from '../component/checbox';
import Radios from '../component/radios';
import Inputs from '../component/Inputs';
import Dialog from '../component/dialog';
import PaginationExample from '../component/Pagination';
import DateTimePicker from '../component/DateTimePicker';


const AntdPanel = Collapse.Panel;


const UIDemo = () => (
  <Collapse defaultActiveKey={['1']}>
    <AntdPanel header="panels" key="1">
      <Panels />
    </AntdPanel>
    <AntdPanel header="buttons" key="2">
      <Buttons />
    </AntdPanel>
    <AntdPanel header="checkbox" key="3">
      <Checkboxes />
    </AntdPanel>
    <AntdPanel header="Radios" key="4">
      <Radios />
    </AntdPanel>
    <AntdPanel header="Dialogs" key="5">
      <Dialog />
    </AntdPanel>
    <AntdPanel header="Edit Field" key="6">
      参见<Link to="/setup/company-info">公司信息的修改  click me! </Link>
    </AntdPanel>
    <AntdPanel header="Inputs" key="7">
      <Inputs />
    </AntdPanel>
    <AntdPanel header="Date Conversion" key="8">
      <DateTimePicker />
    </AntdPanel>
    <AntdPanel header="Pagination" key="9">
      <PaginationExample />
    </AntdPanel>
  </Collapse>

);


export default UIDemo;
