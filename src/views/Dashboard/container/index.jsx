import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Button, Icon} from 'antd';
import {Panel} from 'components/ui/index';
import LeftSection from '../components/leftSection';

import PropTypes from 'prop-types';


class Dashboard extends Component {
  render() {
    return (
        <Row>
            <Col className="gutter-row" span={6} >
                <LeftSection />
            </Col>
            <Col className="gutter-row" span={18}>
                abc
            </Col>

        </Row>

    );
  }
}

export default Dashboard;