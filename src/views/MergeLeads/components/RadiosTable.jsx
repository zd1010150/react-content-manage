import { Col, Icon, Row, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { RadioField } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import styles from './index.less';
import { setMergedData, setMasterRecord } from '../flow/actions';
const cx = classNames.bind(styles);
const { MasterKey, AntdGridMax } = Enums;


const defaultProps = {
  data: [],
  keys: [],
  mergedData: {},
};
const propTypes = {
  intl: intlShape.isRequired,
  data: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
  mergedData: PropTypes.object.isRequired,
  setMasterRecord: PropTypes.func,
  setMergedData: PropTypes.func,
};


class RadiosTable extends Component {
  handleRadioChange = (key, value) => {
    console.log(`---==ONRADIOCHANGE==---${key} ->>> ${value}`);
    const { setMergedData, setMasterRecord } = this.props;
    if (key === MasterKey) {
      return setMasterRecord(value);
    }
    return setMergedData(key, value);
  }
  
  render() {
    const { intl, data, keys, mergedData } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.mergeLeads';

    const labelColLayout = {
      sm: 4,
    };
    const colLayout = {
      sm: Math.floor((AntdGridMax - labelColLayout.sm) / data.length),
    };

    const masterLabel = (
      <Fragment>
        <span>{formatMessage({ id: `${i18n}.master` })}</span>
        <Tooltip placement="right" title={formatMessage({ id: `${i18n}.aboutMaster` })}>
          <Icon
            className="ml-sm"
            size="small"
            style={{ color: 'red', fontWeight: '400' }}
            type="exclamation-circle"
          />
        </Tooltip>
      </Fragment>
    );

    return (
      <Fragment>
        {/* header with leads name */}
        <Row>
          {data.length > 0 && <Col className={cx('title')} key={MasterKey} {...labelColLayout} />}
          {data.map(record =>
            <Col className={cx('title')} key={record.id} {...colLayout}>
              {record.name}
            </Col>
          )}
        </Row>
        <Row>
          {/* label col */}
          <Col key={MasterKey} {...labelColLayout}>
            {keys.map(key => 
              <div className={cx('labelCol')} key={key.key}>
                {key.key === MasterKey ? masterLabel : key.label}
              </div>
            )}
          </Col>
          {/* value cols */}
          {data.map(record => 
            <Col key={record.id} {...colLayout}>
              {keys.map(key =>
                <RadioField
                  key={key.key}
                  fieldKey={key}
                  data={record}
                  mergedData={mergedData}
                  onChange={this.handleRadioChange}
                />
              )}
            </Col>
          )}
        </Row>
      </Fragment>
    );
  }
}


RadiosTable.defaultProps = defaultProps;
RadiosTable.propTypes = propTypes;
const mapStateToProps = ({ mergence }) => ({
  data: mergence.data,
  keys: mergence.keys,
  mergedData: mergence.mergedData,
});
const mapDispatchToProps = {
  setMergedData,
  setMasterRecord,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RadiosTable));