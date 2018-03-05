/* eslint-disable no-shadow */
import React from 'react';
import { Checkbox } from 'antd';


const Checkboxes = () => (
    <div>
        <h2>differnet theme</h2>
        <Checkbox className="lead-theme-checkbox"
        >
            lead
        </Checkbox>
        <Checkbox className="account-theme-checkbox"
        >
            account
        </Checkbox>
        <Checkbox className="opport-theme-checkbox"
        >
            opport
        </Checkbox>
        <Checkbox className="report-theme-checkbox"
        >
            report
        </Checkbox>
    </div>
);


export default Checkboxes;
