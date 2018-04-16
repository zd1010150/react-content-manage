import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { RadioField } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import styles from './index.less';
const cx = classNames.bind(styles);
const { MasterKey, AntdGridMax } = Enums;
import { setMergedData } from '../flow/actions';


const defaultProps = {
  data: [],
  keys: [],  
  mergedData: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  data: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
  mergedData: PropTypes.array.isRequired,
};


class RadiosTable extends Component {
  handleRadioChange = e => {
    e.stopPropagation();
    const { dataset, checked } = e.target;
    const { key, value } = dataset;
    this.props.setMergedData(key, value);
  }
  
  render() {
    const { intl, data, keys, mergedData } = this.props;
    const { formatMessage } = intl;

    const labelColLayout = {
      sm: 4,
    };
    const colLayout = {
      sm: (AntdGridMax - labelColLayout.sm) / data.length,
    };

    return (
      <Fragment>
        {/* header with leads name */}
        <Row onClick={this.handleRadioChange}>
          {/* label col */}
          <Col {...labelColLayout}>
            {keys.map(key => 
              <div className={cx('labelCol')} key={key.key}>
                {key.key === MasterKey ? 'MasterRecord' : key.label}
              </div>
            )}
          </Col>
          {/* value cols */}
          {data.map(record => 
            <Col key={record.id} {...colLayout}>
              {keys.map(key =>
                <RadioField
                  fieldKey={key}
                  data={record}
                  mergedData={mergedData}
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
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RadiosTable));