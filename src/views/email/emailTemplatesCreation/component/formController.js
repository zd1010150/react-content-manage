import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Select, Input, Row, Col} from 'antd';
import classNames from 'classnames/bind';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);
const TextArea = Input.TextArea;
export const SelectComponent = ({hint, defaultValue, items, label, onChange, value, optional, fixedID}) => {
    return <Row className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}{!optional && <span className={`${cx('create-template-red-color')}`}>*</span>}
        </Col>
        <Col className="gutter-row field-value" span={20}>
            <Select 
            onChange={(value) => {
                onChange(value)
            }} 
            defaultValue={defaultValue} 
            className="full-width"  getPopupContainer={() => document.getElementById(fixedID)}>
                {items && items.map((item) =>
                    <Select.Option key={item.id} value={value(item)}>{item.name}</Select.Option>
                )}
            </Select>
            <span className={`${cx('create-template-red-color')}`}>{hint}</span>
        </Col>
    </Row>
}
SelectComponent.SelectComponent = {
    defaultValue: '',
    items: [],
    label: '',
    value: v=>v
};
SelectComponent.propTypes = {
    defaultValue: PropTypes.string,
    items: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
}

export const SelectComponentVertical = ({defaultValue, items, label, onChange, value,labelInValue}) => {
    return <Fragment>
        <div>
            {label}
        </div>
        {labelInValue &&
            <Select labelInValue={labelInValue} onChange={onChange} defaultValue={defaultValue} className="full-width">
                { items && items.map((item, index) =>
                    <Select.Option key={item.id ? item.id : index} value={item.id}>{value(item)}</Select.Option>
                )}
            </Select>
        }
        {!labelInValue &&
        <Select labelInValue={labelInValue} onChange={onChange} value={defaultValue} className="full-width">
            {items && items.map((item, index) =>
                <Select.Option key={index} value={item}>{item}</Select.Option>
            )}
        </Select>
        }

    </Fragment>
}
SelectComponentVertical.SelectComponent = {
    defaultValue: '',
    items: [],
    label: '',
    value: v=>v,
    labelInValue: false
};
SelectComponentVertical.propTypes = {
    defaultValue: PropTypes.string,
    items: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.func,
    labelInValue: PropTypes.bool,
}


export const InputComponent = ({style, type, disableInput, value, label, onChange, optional}) => {
    return <Row style={style} className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}{!optional && <span className={`${cx('create-template-red-color')}`}>*</span>}
        </Col>
        <Col className="gutter-row field-value" span={20}>
            {
                !!value && <Input type={type} disabled={disableInput} value={value} onChange={(e) => {
                    onChange(e.target.value)
                }}/>
            }
            {
                !value && <Input type={type} disabled={disableInput} onChange={(e) => {
                    onChange(e.target.value)
                }}/>
            }
        </Col>
    </Row>
}
InputComponent.SelectComponent = {
    style: {},
    type: 'text',
    label: '',
    disableInput: false,
    value: ''
};
InputComponent.propTypes = {
    style: PropTypes.object,
    type: PropTypes.string,
    disableInput: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
}

export const TextAreaComponent = ({style, value, label, onChange}) => {
    return <Row style={style} className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}
        </Col>
        <Col className="gutter-row field-value" span={20}>
            <TextArea value={value} onChange={(e) => {
                onChange(e.target.value)}}/>
        </Col>
    </Row>
}
TextAreaComponent.SelectComponent = {
    style: {},
    label: '',
    value: ''
};
TextAreaComponent.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
}