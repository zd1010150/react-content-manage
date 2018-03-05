/* eslint-disable no-shadow */
import React from 'react';
import { Collapse } from 'antd';
import Panels from '../component/panels';
import Buttons from '../component/buttons';
import Checkboxes from '../component/checbox';
import Radios from '../component/radios';

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
  </Collapse>

);


export default UIDemo;
