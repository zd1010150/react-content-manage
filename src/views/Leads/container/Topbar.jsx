import React from 'react';
import { Row, Col } from 'antd';

import ViewFilterWrapper from '../components/Filter/index';
import BtnsWrapper from '../components/Buttons/index';

const Topbar = () => {
  const colLayout = {
    xs: 24,
    sm: 12,
  }
  return (
    <Row style={{ marginBottom: 5 }}>
      <Col {...colLayout}>
        <ViewFilterWrapper />
      </Col>
      <Col {...colLayout} style={{ textAlign: 'right' }}>
        <BtnsWrapper />
      </Col>
    </Row>
  );
};

export default Topbar;