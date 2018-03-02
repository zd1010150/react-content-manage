/* eslint-disable no-shadow */
import React from 'react';
import { Button, Radio, Icon } from 'antd';
import { Panel } from 'components/ui/index';


const Buttons = () => (
  <div>
    <h2>different size:</h2>
    <Button className="ml-sm" size="small">small</Button>
    <Button className="ml-sm" >default</Button>
    <Button className="ml-sm" size="large">default</Button>
    <h2>different type</h2>
    <Button className="ml-sm ">default</Button>
      <Button className="ml-sm " type="danger">Danger</Button>
    <h2>differnet theme</h2>
      <Button className="ml-sm lead-theme-btn" >lead</Button>
      <Button className="ml-sm account-theme-btn" >account</Button>
      <Button className="ml-sm opport-theme-btn" >opport</Button>
      <Button className="ml-sm report-theme-btn" >report</Button>
  </div>
);


export default Buttons;
