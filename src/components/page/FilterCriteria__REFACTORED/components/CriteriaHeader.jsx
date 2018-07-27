import { Button, Col, Icon, Row, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import styles from '../index.less';

const cx = classNames.bind(styles);
const mainColLayout = {
  sm: 8,
  xs: 24,
};


const defaultProps = {
  onMoreInfoClick: null,
};
const propTypes = {
  intl: intlShape.isRequired,
  onMoreInfoClick: PropTypes.func,
};

const CriteriaHeader = ({
  intl,
}) => {
  const { formatMessage } = intl;
  const i18n = 'page.FilterCriteria__REFACTORED';

  return (
    <Row className={cx('row')}>
      <div className={cx('firstCol')} />
      <Row className={cx('mainCol')}>
        <Col {...mainColLayout} className="required">
          {formatMessage({ id: `${i18n}.field` })}
        </Col>
        <Col {...mainColLayout} className="required">
          {formatMessage({ id: `${i18n}.condition` })}
          <Tooltip
            placement="right"
            title={(
              <div>
                {formatMessage({ id: `${i18n}.condTip` })}
                {/* // TODO: better ux purpose */}
                {/* <br />
                More details please check:
                <Button size="small" onClick={onMoreInfoClick}>Conditons List</Button> */}
              </div>
            )}
          >
            <Icon type="info-circle-o" className="ml-sm font-sm" />
          </Tooltip>
        </Col>
        <Col {...mainColLayout}>
          {formatMessage({ id: `${i18n}.value` })}
          <Tooltip
            placement="right"
            title={formatMessage({ id: `${i18n}.valueTip` })}
          >
            <Icon type="info-circle-o" className="ml-sm font-sm" />
          </Tooltip>
        </Col>
      </Row>
      <div className={cx('lastCol')} />
    </Row>
  );
};

CriteriaHeader.defaultProps = defaultProps;
CriteriaHeader.propTypes = propTypes;
export default injectIntl(CriteriaHeader);
