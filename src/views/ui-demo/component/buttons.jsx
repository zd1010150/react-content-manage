/* eslint-disable no-shadow */
import React from 'react';
import { Button, Radio, Icon } from 'antd';


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
      <Button className="ml-sm email-theme-btn" >email</Button>
      <h2> eillipse buttons</h2>
      <Button className="btn-ellipse ml-sm lead-theme-btn" size="small">lead ellipse</Button>
      <Button className="btn-ellipse ml-sm account-theme-btn" size="small">account ellipse</Button>
      <Button className="btn-ellipse ml-sm opport-theme-btn" size="small">opport ellipse</Button>
      <Button className="btn-ellipse ml-sm report-theme-btn" size="small">report ellipse</Button>
      <h2> icon buttons</h2>
      <Button shape="circle" icon="search" />
      <Button className="ml-sm lead-theme-btn" shape="circle" icon="search" />

  </div>
);


export default Buttons;
