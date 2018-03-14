/* eslint-disable no-shadow */
import React from 'react';
import { Collapse, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import Panels from '../component/panels';
import Buttons from '../component/buttons';
import Checkboxes from '../component/checbox';
import Radios from '../component/radios';
import Inputs from '../component/Inputs';
import Dialog from '../component/dialog';
import PaginationExample from '../component/Pagination';
import DateTimePicker from '../component/DateTimePicker';
import TeamTree from '../component/TeamTree';
import MultiDnD from 'components/ui/multipleDragFields/Controller';

const AntdPanel = Collapse.Panel;
const { TabPane } = Tabs;

const UIDemo = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="Html UI" key="1">
      <Collapse defaultActiveKey={['10']}>
        <AntdPanel header="dnd" key="10">
          <MultiDnD />
        </AntdPanel>
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
                参见<Link to="/setup/company-info/company-info">公司信息的修改  click me! </Link>
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
    </TabPane>
    <TabPane tab="Page UI" key="2">
      <Collapse >
        <AntdPanel header="Team Tree" key="1">
          <TeamTree />
        </AntdPanel>

      </Collapse>
    </TabPane>
    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
  </Tabs>


);


export default UIDemo;
