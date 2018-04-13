/* eslint-disable no-shadow */
import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const Radios = ({ onChange }) => (
    <RadioGroup defaultValue={1} onChange={onChange}>
        <Radio value={1}>Default</Radio>
        <Radio className="lead-theme-radio" value={2}>Lead</Radio>
        <Radio className="account-theme-radio" value={3}>Account</Radio>
        <Radio className="opport-theme-radio" value={4}>Opport</Radio>
        <Radio className="report-theme-radio" value={5}>Report</Radio>
        <Radio className="email-theme-radio" value={6}>email</Radio>
    </RadioGroup>
);


export default Radios;
