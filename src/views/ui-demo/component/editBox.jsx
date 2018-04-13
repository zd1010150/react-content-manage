/* eslint-disable no-shadow */
import React from 'react';
import { Row, Col } from 'antd';
import { Panel, EditBox } from 'components/ui/index';


class EditBoxes extends React.Component {
  render() {
    return (
      <Panel>
        <Row className="pt-lg pb-lg pl-lg">
          <Col className="gutter-row" span={24}>
            <Row>
              <Col className="gutter-row field-label" span={2}><span className="form-label">disabled:</span></Col>
              <Col className="gutter-row field-label" span={22}>  <EditBox type="input" value="dandan" isDisabled /></Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row>
              <Col className="gutter-row field-label" span={2}> <span className="form-label">input:</span></Col>
              <Col className="gutter-row field-label" span={22}>  <EditBox type="input" value="dandan" onBlur={value => console.log('modified value', value)} /></Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row>
              <Col className="gutter-row field-label" span={2}><span className="form-label">select:</span></Col>
              <Col className="gutter-row field-label" span={22}>  <EditBox type="select" options={[{ value: 'ch', text: '中国' }, { value: 'en', text: '英国' }]} value="ch" onBlur={value => console.log('modified value', value)} /></Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row>
              <Col className="gutter-row field-label" span={2}><span className="form-label">date:</span></Col>
              <Col className="gutter-row field-label" span={22}>  <EditBox type="datePicker" value="2015/01/03" onBlur={value => console.log('modified value', value)} /></Col>
            </Row>
          </Col>
        </Row>
      </Panel>
    );
  }
}


export default EditBoxes;
