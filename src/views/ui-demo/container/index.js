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
import MultiDnD from '../component/MultiDragContainer';
import Fields from '../component/Fields';
import Sections from '../component/Sections';
import RightSideBar from '../component/rightSideBar';
import EditBoxes from '../component/editBox';

const AntdPanel = Collapse.Panel;
const { TabPane } = Tabs;

const UIDemo = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="Html UI" key="1">
      <Collapse defaultActiveKey="11">
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
          <EditBoxes />
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
        <AntdPanel header="Custom Fields" key="10">
          <Fields />
        </AntdPanel>
        <AntdPanel header="Sections" key="11">
          <Sections />
        </AntdPanel>
      </Collapse>
    </TabPane>
    <TabPane tab="Page UI" key="2">
      <Collapse >
        <AntdPanel header="Team Tree" key="1">
          <TeamTree />
        </AntdPanel>
      </Collapse>
      <Collapse >
        <AntdPanel header="RightSideBar" key="2">
          <RightSideBar />
        </AntdPanel>
      </Collapse>
    </TabPane>
    <TabPane tab="DnD UI" key="3">
      <Collapse defaultActiveKey={['1']}>
        <AntdPanel header="Multi Draggable Items" key="1">
          <MultiDnD />
        </AntdPanel>
      </Collapse>
    </TabPane>
  </Tabs>


);


export default UIDemo;
