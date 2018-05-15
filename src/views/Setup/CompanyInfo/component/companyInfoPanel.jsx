/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Permission } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Panel, EditBox } from 'components/ui/index';
import styles from '../companyInfo.less';
import { setStore, getStore } from 'utils/localStorage';
import Enums from 'utils/EnumsManager';
import { DEFAULT_DATE_SETTING } from 'config/app.config';

const cx = classNames.bind(styles);

class companyInfoPanel extends React.Component {
  onBlur(fieldName, value) {
    const { countries, timeZones, updateCompanyInfo } = this.props;
    updateCompanyInfo({ [fieldName]: value }, () => {
      let newDateFormat = {};
      let newOffset = {};
      if (fieldName === 'country_code') {
        const countryArr = countries.filter(c => c.id === value);
        const country = _.isEmpty(countryArr) ? { date_format: DEFAULT_DATE_SETTING.DATE_FORMAT } : countryArr[0];
        newDateFormat = {
          dateFormat: country.date_format || DEFAULT_DATE_SETTING.DATE_FORMAT,
        };
        newDateFormat = Object.assign({}, newDateFormat, { timeFormat: `${newDateFormat.dateFormat} HH:mm:ss` });
      }
      if (fieldName === 'time_zone') {
        const timeZoneArr = timeZones.filter(t => t.id === value);
        const timeZone = _.isEmpty(timeZoneArr) ? { tz_offset: DEFAULT_DATE_SETTING.OFFSET } : timeZoneArr[0];
        newOffset = {
          offset: timeZone.tz_offset,
        };
      }

      const originTimeformat = JSON.parse(getStore(Enums.LocalStorageKeys.Timezone));
      setStore(Enums.LocalStorageKeys.Timezone, JSON.stringify(Object.assign({}, originTimeformat, { ...newDateFormat }, { ...newOffset })));
    });
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
    const country = countriesOptions.filter(c => c.value === company.country_code);
    const countryName = country.length > 0 ? country[0].text : '';

    const year = yearsOptions.filter(c => c.value === company.fiscal_year_starts);
    const yearName = year.length > 0 ? year[0].text : '';

    const language = languageOptions.filter(c => c.value === company.language);
    const languageName = language.length > 0 ? language[0].text : '';

    const timeZone = timeZoneOptions.filter(c => c.value === company.time_zone);
    const timeZoneName = timeZone.length > 0 ? timeZone[0].text : '';
    return (
      <Panel panelTitle={formatMessage({ id: 'page.comInfo.organizationDetail' })}>
        <div className="info-display-table pb-sm">
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.name' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{company.name}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="input"
                      value={company.name}
                      onBlur={value => this.onBlur('name', value)}
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}> <span className="form-label">{ formatMessage({ id: 'page.comInfo.phone' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{company.phone}</span>}>
                    <EditBox isShowStatuLabel={false} spanClasses={cx('edit-box-span')} inputClasses={cx('edit-box-input')} type="input" value={company.phone} onBlur={value => this.onBlur('phone', value)} />
                  </Permission>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.fax' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{company.fax}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="input"
                      value={company.fax}
                      onBlur={value => this.onBlur('fax', value)}
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.address' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{company.address}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="input"
                      value={company.address}
                      onBlur={value => this.onBlur('address', value)}
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.country' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{countryName}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="select"
                      value={company.country_code}
                      options={countriesOptions}
                      onBlur={value => this.onBlur('country_code', value, true, countries)}
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.fiscalYearStarts' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{yearName}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="datePicker"
                      value={company.fiscal_year_starts}
                      onChange={(value) => {
                        this.onBlur('fiscal_year_starts', value);
                      }
                      }
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.timeZone' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{timeZoneName}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="select"
                      value={company.time_zone}
                      options={timeZoneOptions}
                      onBlur={value => this.onBlur('time_zone', value, true, timeZones)}
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.usedDataSpace' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{company.used_data_space}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="input"
                      isDisabled
                      value={company.used_data_space}
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.fileStorage' }) }:</span></Col>
                <Col className=" field-value" span={12}><span className={cx('edit-box-span')}>{ company.file_storage } </span>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{company.file_storage}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="input"
                      isDisabled
                      value={company.file_storage}
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.lastModify' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{`${company.user && company.user.name} ${company.updated_at}`}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="input"
                      isDisabled
                      value={`${company.user && company.user.name} ${company.updated_at}`}
                    />
                  </Permission>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="info-display-table-row">
            <Col className="gutter-row" span={12}>
              <Row>
                <Col className=" field-label" span={12}><span className="form-label">{ formatMessage({ id: 'page.comInfo.language' }) }:</span></Col>
                <Col className=" field-value" span={12}>
                  <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_COMPANYINFORMATION_UPDATE} errorComponent={<span>{languageName}</span>}>
                    <EditBox
                      isShowStatuLabel={false}
                      spanClasses={cx('edit-box-span')}
                      inputClasses={cx('edit-box-input')}
                      type="select"
                      options={languageOptions}
                      value={company.language}
                      onBlur={value => this.onBlur('language', value, true, languages)}
                    />
                  </Permission>
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
