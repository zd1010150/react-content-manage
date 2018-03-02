/* eslint-disable no-shadow */
import React from 'react';
import { Collapse } from 'antd';
import Panels from '../component/panels';
import Buttons from '../component/buttons';

const AntdPanel = Collapse.Panel;


const UIDEMO = () => (
  <Collapse defaultActiveKey={['1']}>
    <AntdPanel header="panels" key="1">
      <Panels />
    </AntdPanel>
    <AntdPanel header="buttons" key="2">
      <Buttons />
    </AntdPanel>


  </Collapse>

);


export default UIDEMO;
