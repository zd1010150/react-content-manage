/* eslint-disable no-shadow */
import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const Radios = () => (
    <div>
        <RadioGroup>
            <Radio value={1}>Default</Radio>
            <Radio className="lead-theme-radio" value={2}>Lead</Radio>
            <Radio className="account-theme-radio" value={3}>account</Radio>
            <Radio className="opport-theme-radio" value={4}>opport</Radio>
            <Radio className="report-theme-radio" value={5}>report</Radio>
        </RadioGroup>
    </div>
);


export default Radios;
