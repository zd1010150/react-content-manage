/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Radio, Row, Col, Divider, Layout } from 'antd';
import { connect } from 'react-redux';
import { RightSider } from 'components/page/index';
import { objTypeAndClassTypeMap, FORM_LAYOUT_CONFIG } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { toggleRightSider } from 'components/page/RightSider/flow/action';
import BodyWrapper from '../component/editView/dragLayer/bodyWrapper';
import DragLayer from '../component/editView/dragLayer/dragLayer';

import ModuleView from '../component/editView/modules/index';
import ModuleViewSider from '../component/editView/modules/siderView';

import ToolView from '../component/editView/tools/index';
import ToolViewSider from '../component/editView/tools/siderView';

import SectionView from '../component/editView/sections/section/index';
import SectionViewSider from '../component/editView/sections/siderView/siderView';

import styles from '../index.less';

import {
  setCanDrop,
  setCurrentTab,
  fetchLayoutDetail,
} from '../flow/edit/action';
import { OPERATES, MODULES, TOOLS, PREVIEW, SECTIONS } from '../flow/edit/operateType';

const cx = classNames.bind(styles);
const { Header, Content } = Layout;

class EditContainer extends React.Component {
  componentDidMount() {
    const {
      toggleRightSider, history, layoutId, objectType,
    } = this.props;
    toggleRightSider(false);
    if (_.isEmpty(`${layoutId}`)) {
      history.push(`/setup/${objectType}/pageLayout`);
    } else {
      this.fetchDetail();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.fetchDetail(nextProps);
    }
  }
  fetchDetail() {
    const { fetchLayoutDetail, layoutId } = this.props;
    if (!_.isEmpty(`${layoutId}`)) {
      fetchLayoutDetail(layoutId);
    }
  }
  changeTab(e) {
    const { setCurrentTab } = this.props;

    setCurrentTab(e.target.value);
  }
  save() {

  }
  cancel() {

  }
  preview() {
    const { setCurrentTab } = this.props;
    setCurrentTab(PREVIEW);
  }
  render() {
    const {
      intl,
      objectType,
      currentTab,
      setCanDrop,
      canDrop,
    } = this.props;
    const { formatMessage } = intl;
    const theme = objTypeAndClassTypeMap[objectType];
    const getMainView = () => {
      switch (currentTab) {
        case MODULES:
          return <ModuleView />;
        case TOOLS:
          return <ToolView />;
        case SECTIONS:
          return <SectionView />;
        default:
          return <ModuleView />;
      }
    };
    const getSiderView = () => {
      switch (currentTab) {
        case MODULES:
          return <ModuleViewSider />;
        case TOOLS:
          return <ToolViewSider />;
        case SECTIONS:
          return <SectionViewSider />;
        default:
          return <ModuleViewSider />;
      }
    };
    return (
      <BodyWrapper setCanDrop={setCanDrop}>
        {
            getMainView()
          }
        <RightSider>
          <Layout>
            <Content>
              <Row className=" pt-lg pl-lg pr-lg">
                <Col span={24}>
                  <Button icon="layout" size="small" className={`${theme}-theme-btn ml-sm`} onClick={() => this.preview()}>{formatMessage({ id: 'global.ui.button.preview' })}</Button>
                  <Button icon="save" type="danger" size="small" className="ml-sm" onClick={() => this.save()}>{formatMessage({ id: 'global.ui.button.save' })}</Button>
                  <Button icon="close" type="default" size="small" className="ml-sm" onClick={() => this.cancel()}>{formatMessage({ id: 'global.ui.button.cancel' })}</Button>
                </Col>
              </Row>
              <Divider/>
              <Row className="pl-lg pr-lg">
                { OPERATES.map(o => (
                  <Col span={24} key={o}>
                    <Radio className={`${theme}-theme-radio mt-sm`} value={o} checked={o === currentTab} onChange={(e) => { this.changeTab(e); }}>
                      { formatMessage({ id: `page.layouts.operates.${o}` })}
                    </Radio>
                  </Col>
                  )) }
              </Row>
              <Divider/>
              <Row className=" pb-lg pl-lg pr-lg">
                <Col span={24}>
                  <div className={cx('sider-view-wrapper')}>
                    {
                          getSiderView()
                      }
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </RightSider>
        <DragLayer canDrop={canDrop} theme={theme} intl={intl} />
      </BodyWrapper>


    );
  }
}
EditContainer.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,

};
const mapStateToProps = ({ setup }) => {
  const {
    editView,
    currentObjectType,
  } = setup.layouts;

  return {
    canDrop: editView.ui && editView.ui.fieldCanDrop,
    currentTab: editView.ui.currentTab,
    objectType: currentObjectType,
    layoutId: editView.layout.id,
  };
};
const mapDispatchToProps = {
  setCurrentTab,
  toggleRightSider,
  setCanDrop,
  fetchLayoutDetail,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditContainer)));
