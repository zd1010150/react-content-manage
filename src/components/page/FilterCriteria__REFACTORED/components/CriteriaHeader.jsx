import React from 'react';
import { Row, Col } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../index.less';

const cx = classNames.bind(styles);
const mainColLayout = {
  sm: 8,
  xs: 24,
};


const propTypes = {
  intl: intlShape.isRequired,
};

const CriteriaHeader = ({
  intl,
}) => {
  const { formatMessage } = intl;
  const i18n = 'page.FilterCriteria__REFACTORED';

  return (
    <Row>
      <div className={cx('firstCol')} />
      <Row className={cx('mainCol')}>
        <Col {...mainColLayout} className="required">
          {formatMessage({ id: `${i18n}.field` })}
        </Col>
        <Col {...mainColLayout} className="required">
          {formatMessage({ id: `${i18n}.condition` })}
        </Col>
        <Col {...mainColLayout} className="required">
          {formatMessage({ id: `${i18n}.value` })}
        </Col>
      </Row>
      <div className={cx('lastCol')} />
    </Row>
  );
};

CriteriaHeader.propTypes = propTypes;
export default injectIntl(CriteriaHeader);
