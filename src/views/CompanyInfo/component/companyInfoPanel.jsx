/* eslint-disable no-shadow */
import React from 'react';
import { Select, Row, Col } from 'antd';
import { Panel, EditBox } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';


class companyInfoPanel extends React.Component {
  onBlur(fieldName, value) {
    console.log(fieldName, value);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const timeZoneOptions = (() => {
      const options = [];
      options.push({ value: 'bj', text: '北京时间' });
      options.push({ value: 'sydney', text: '悉尼时间' });
      return options;
    })();
    return (
      <Panel panelTitle={formatMessage({ id: 'page.comInfo.organizationDetail' })}>
        <div className="info-display-table">
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>Organization Name:</Col>
                <Col className="gutter-row field-value" span={12}> <EditBox type="input" value="acy zeologix" onBlur={value => this.onBlur('name', value)} /></Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>Default Time Zone:</Col>
                <Col className="gutter-row field-value" span={12}> <EditBox type="select" value="bj" options={timeZoneOptions} onBlur={value => this.onBlur('timezone', value)} /></Col>
              </Row>
            </Col>

          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>Organization Name:</Col>
                <Col className="gutter-row field-value" span={12}> <EditBox type="input" value="acy zeologix" onBlur={value => this.onBlur('name', value)} /></Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>Default Time Zone:</Col>
                <Col className="gutter-row field-value" span={12}> <EditBox type="select" value="bj" options={timeZoneOptions} onBlur={value => this.onBlur('timezone', value)} /></Col>
              </Row>
            </Col>

          </Row>
        </div>
      </Panel>
    );
  }
}
companyInfoPanel.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(companyInfoPanel);
