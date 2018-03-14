/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, notification } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Panel, EditBox } from 'components/ui/index';
import styles from '../companyInfo.less';


const cx = classNames.bind(styles);

class companyInfoPanel extends React.Component {
  onBlur(fieldName, value) {
    const { formatMessage } = this.props.intl;
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
        <div className="info-display-table">
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.name' }) }:</Col>
                <Col className="gutter-row field-value" span={12}> <EditBox spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="input" value={company.name} onBlur={value => this.onBlur('name', value)} /></Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}> { formatMessage({ id: 'page.comInfo.phone' }) }:</Col>
                <Col className="gutter-row field-value" span={12}>  <EditBox spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="input" value={company.phone} onBlur={value => this.onBlur('phone', value)} /></Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.fax' }) }:</Col>
                <Col className="gutter-row field-value" span={12}>  <EditBox spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="input" value={company.fax} onBlur={value => this.onBlur('fax', value)} /></Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.address' }) }:</Col>
                <Col className="gutter-row field-value" span={12}>  <EditBox spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="input" value={company.address} onBlur={value => this.onBlur('address', value)} /></Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.country' }) }:</Col>
                <Col className="gutter-row field-value" span={12}>  <EditBox spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="select" value={company.country_code} options={countriesOptions} onBlur={value => this.onBlur('country_code', value, true, countries)} /></Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.fiscalYearStarts' }) }:</Col>
                <Col className="gutter-row field-value" span={12}>  <EditBox spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="select" options={yearsOptions} value={company.fiscal_year_starts} onBlur={value => this.onBlur('fiscal_year_starts', value)} /></Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.timeZone' }) }:</Col>
                <Col className="gutter-row field-value" span={12}>  <EditBox spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="select" value={company.time_zone} options={timeZoneOptions} onBlur={value => this.onBlur('time_zone', value, true, timeZones)} /></Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.usedDataSpace' }) }:</Col>
                <Col className="gutter-row field-value" span={12}> <span className={cx('edit-box-span')}>{ company.used_data_space } </span></Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.fileStorage' }) }:</Col>
                <Col className="gutter-row field-value" span={12}><span className={cx('edit-box-span')}>{ company.file_storage } </span></Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.lastModify' }) }:</Col>
                <Col className="gutter-row field-value" span={12}><span className={cx('edit-box-span')}>{company.user && company.user.name} {company.updated_at}</span></Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className="gutter-row field-label" span={12}>{ formatMessage({ id: 'page.comInfo.language' }) }:</Col>
                <Col className="gutter-row field-value" span={12}><EditBox spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="select" options={languageOptions} value={company.language} onBlur={value => this.onBlur('language', value, true, languages)} /></Col>
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
