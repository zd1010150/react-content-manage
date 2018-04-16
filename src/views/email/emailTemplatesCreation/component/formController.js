import React, {Fragment} from 'react';
import {Select, Input, Row, Col} from 'antd';
import classNames from 'classnames/bind';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);
const TextArea = Input.TextArea;

export const SelectComponent = ({defaultValue, items, label, onChange}) => {
    return <Row className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}
        </Col>
        <Col className="gutter-row field-value" span={20}>
            <Select onChange={(value) => {
                onChange(value)
            }} defaultValue={defaultValue} className="full-width">
                {items && items.map((folder) =>
                    <Option key={folder.id} value={folder.id}>{folder.name}</Option>
                )}
            </Select>
        </Col>
    </Row>
}

export const SelectComponentVertical = ({label, onChange}) => {
    return <Fragment>
        <div>
            {label}
        </div>
        <Select onChange={onChange} defaultValue="Zhejiang" className="full-width">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
        </Select>
    </Fragment>
}

export const InputComponent = ({style, type, disableInput, value, label, onChange}) => {
    return <Row style={style} className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}
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