/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Radio, Row, Col, Divider, Layout } from 'antd';
import { connect } from 'react-redux';
import { EditBox, DeleteConfirmDialog } from 'components/ui/index';
import { RightSider, Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
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

import Preview from '../component/editView/preview/index';

import styles from '../index.less';

import {
  setCanDrop,
  setCurrentTab,
  fetchLayoutDetail,
  updateLayoutDetail,
  setCurrentLayout,
} from '../flow/edit/action';
import { OPERATES, MODULES, TOOLS, PREVIEW, SECTIONS } from '../flow/edit/operateType';

const cx = classNames.bind(styles);
const { Header, Content } = Layout;

class EditContainer extends React.Component {
    state={
      deleteDialogVisible: false,
    }
    componentWillUnmount() {
      const {
        toggleRightSider,
      } = this.props;
      toggleRightSider(true);
    }
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
      const {
        updateLayoutDetail, layoutName, layoutId, sections, tools, modules,
      } = this.props;
      const mappedSections = sections.map((section) => {
        let mappedFields = [];
        if (!_.isEmpty(section.fields)) {
          Object.keys(section.fields).forEach((colIndex) => {
            mappedFields = [...mappedFields, ...section.fields[colIndex].map(f => ({
              id: f.id,
              page_required: f.pageRequired,
              page_readonly: f.pageReadonly,
              position: [f.x, f.y],
            }))];
          });
        }

        return {
          code: section.code,
          sequence: section.sequence,
          columns: section.cols,
          label: section.label,
          fields: mappedFields,
        };
      });
      const mappedTools = tools.map((tool, index) => ({
        code: tool,
        sequence: index,
      }));
      const mappedModules = modules.map((module, index) => ({
        code: module,
        sequence: index,
      }));
      updateLayoutDetail(layoutId, layoutName, {
        sections: mappedSections,
        tools: mappedTools,
        modules: mappedModules,
      }, () => {
        const { history, objectType } = this.props;
        history.push(`/setup/${objectType}/pageLayout`);
      });
    }
    cancel() {
      this.setState({ deleteDialogVisible: true });
    }
    confirmCancel() {
      this.setState({ deleteDialogVisible: false });
      const { history, objectType } = this.props;
      history.push(`/setup/${objectType}/pageLayout`);
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
        layoutId,
        setCanDrop,
        canDrop,
        layoutName,
        setCurrentLayout,
      } = this.props;
      const { formatMessage } = intl;
      const theme = objTypeAndClassTypeMap[objectType];
      const permissionPrefix = `SETUP_${objectType.toUpperCase()}_PAGELAYOUT`;
      const getMainView = () => {
        switch (currentTab) {
          case MODULES:
            return <ModuleView />;
          case TOOLS:
            return <ToolView />;
          case SECTIONS:
            return <SectionView />;
          case PREVIEW:
            return <Preview />;
          default:
            return <ModuleView />;
        }
      };
      const getSiderView = () => {
        switch (currentTab) {
          case MODULES:
            return <ModuleViewSider theme={theme} objectType={objectType} />;
          case TOOLS:
            return <ToolViewSider theme={theme} objectType={objectType} />;
          case SECTIONS:
            return <SectionViewSider theme={theme} />;
          case PREVIEW:
            return '';
          default:
            return '';
        }
      };
      return (
        <Permission permission={PERMISSIONS[`${permissionPrefix}_UPDATE`]} errorComponent={<Unauthentication />}>
          <BodyWrapper setCanDrop={setCanDrop}>
            {
            getMainView()
          }
            <RightSider>
              <Layout>
                <Content style={{ backgroundColor: '#fff' }}>
                  <Row className="pt-lg pl-lg pr-lg">
                    <EditBox type="input" spanClasses={cx('layout-title')} value={layoutName} onBlur={value => setCurrentLayout({ name: value })} />

                  </Row>
                  <Divider />
                  <Row className="pl-lg pr-lg">
                    <Col span={24}>
                      <Button icon="layout" size="small" className={`${theme}-theme-btn ml-sm`} onClick={() => this.preview()}>{formatMessage({ id: 'global.ui.button.preview' })}</Button>
                      <Button icon="save" type="danger" size="small" className="ml-sm" onClick={() => this.save()}>{formatMessage({ id: 'global.ui.button.save' })}</Button>
                      <Button icon="close" type="default" size="small" className="ml-sm" onClick={() => this.cancel()}>{formatMessage({ id: 'global.ui.button.cancel' })}</Button>
                    </Col>
                  </Row>
                  <Divider />
                  <Row className="pl-lg pr-lg">
                    { OPERATES.map(o => (
                      <Col span={24} key={o}>
                        <Radio className={`${theme}-theme-radio mt-sm`} value={o} checked={o === currentTab} onChange={(e) => { this.changeTab(e); }}>
                          { formatMessage({ id: `page.layouts.operates.${o}` })}
                        </Radio>
                      </Col>
                  )) }
                  </Row>
                  <Divider />
                  <Row>
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
            <DeleteConfirmDialog visible={this.state.deleteDialogVisible} onOk={() => this.confirmCancel()} onCancel={() => this.setState({ deleteDialogVisible: false })} confirmText="ok">
              <h3>{ formatMessage({ id: 'page.layouts.cancelEditing' })}</h3>
            </DeleteConfirmDialog>
          </BodyWrapper>
        </Permission>

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
    tools: editView.tools,
    modules: editView.modules,
    sections: editView.sections,
    canDrop: editView.ui && editView.ui.fieldCanDrop,
    currentTab: editView.ui.currentTab,
    objectType: currentObjectType,
    layoutId: editView.layout.id,
    layoutName: editView.layout.name,
  };
};
const mapDispatchToProps = {
  setCurrentTab,
  toggleRightSider,
  setCanDrop,
  fetchLayoutDetail,
  updateLayoutDetail,
  setCurrentLayout,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditContainer)));
