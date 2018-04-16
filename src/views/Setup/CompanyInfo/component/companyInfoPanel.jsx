/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Panel, EditBox } from 'components/ui/index';
import styles from '../companyInfo.less';


const cx = classNames.bind(styles);

class companyInfoPanel extends React.Component {
  onBlur(fieldName, value) {
    this.props.updateCompanyInfo({ [fieldName]: value });
  }
  render() {
    const {
      languages, timeZones, countries, years, company,
    } = this.props;
    const { formatMessage } = this.props.intl;
    const timeZoneOptions = timeZones.map(item => ({
      value: item.id,
      text: item.display_value,
    }));
    const countriesOptions = countries.map(item => ({
      value: item.id,
      text: item.display_value,
    }));
    const languageOptions = languages.map(item => ({
      value: item.id,
      text: item.display_value,
    }));
    const yearsOptions = years.map(item => ({
      value: item,
      text: item,
    }));
    return (
      <Panel panelTitle={formatMessage({ id: 'page.comInfo.organizationDetail' })}>
        <div className="info-display-table pb-sm">
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.name' }) }:</span></Col>
                <Col className=" field-value" span={12}> <EditBox isShowStatuLabel={false} spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="input" value={company.name} onBlur={value => this.onBlur('name', value)} /></Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}> <span className="form-label">{ formatMessage({ id: 'page.comInfo.phone' }) }:</span></Col>
                <Col className=" field-value" span={12}>  <EditBox isShowStatuLabel={false} spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="input" value={company.phone} onBlur={value => this.onBlur('phone', value)} /></Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.fax' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <EditBox
                    isShowStatuLabel={false}
                    spanClasses={cx('edit-box-span')}
                    inputClasses={cx('edit-box-input')}
                    type="input"
                    value={company.fax}
                    onBlur={value => this.onBlur('fax', value)}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.address' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <EditBox
                    isShowStatuLabel={false}
                    spanClasses={cx('edit-box-span')}
                    inputClasses={cx('edit-box-input')}
                    type="input"
                    value={company.address}
                    onBlur={value => this.onBlur('address', value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.country' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <EditBox
                    isShowStatuLabel={false}
                    spanClasses={cx('edit-box-span')}
                    inputClasses={cx('edit-box-input')}
                    type="select"
                    value={company.country_code}
                    options={countriesOptions}
                    onBlur={value => this.onBlur('country_code', value, true, countries)}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.fiscalYearStarts' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <EditBox
                    isShowStatuLabel={false}
                    spanClasses={cx('edit-box-span')}
                    inputClasses={cx('edit-box-input')}
                    type="select"
                    options={yearsOptions}
                    value={company.fiscal_year_starts}
                    onBlur={value => this.onBlur('fiscal_year_starts', value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.timeZone' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <EditBox
                    isShowStatuLabel={false}
                    spanClasses={cx('edit-box-span')}
                    inputClasses={cx('edit-box-input')}
                    type="select"
                    value={company.time_zone}
                    options={timeZoneOptions}
                    onBlur={value => this.onBlur('time_zone', value, true, timeZones)}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.usedDataSpace' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <EditBox
                    isShowStatuLabel={false}
                    spanClasses={cx('edit-box-span')}
                    inputClasses={cx('edit-box-input')}
                    type="input"
                    isDisabled
                    value={company.used_data_space}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.fileStorage' }) }:</span></Col>
                <Col className=" field-value" span={12}><span className={cx('edit-box-span')}>{ company.file_storage } </span>
                  <EditBox
                    isShowStatuLabel={false}
                    spanClasses={cx('edit-box-span')}
                    inputClasses={cx('edit-box-input')}
                    type="input"
                    isDisabled
                    value={company.file_storage}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.lastModify' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <EditBox
                    isShowStatuLabel={false}
                    spanClasses={cx('edit-box-span')}
                    inputClasses={cx('edit-box-input')}
                    type="input"
                    isDisabled
                    value={`${company.user && company.user.name} ${company.updated_at}`}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.language' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <EditBox isShowStatuLabel={false} spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="select" options={languageOptions} value={company.language} onBlur={value => this.onBlur('language', value, true, languages)} />
                </Col>
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
  updateCompanyInfo: PropTypes.func.isRequired,
  timeZones: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  moments: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  company: PropTypes.object.isRequired,

};

export default injectIntl(companyInfoPanel);
