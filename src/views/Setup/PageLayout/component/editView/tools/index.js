/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Panel } from 'components/ui/index';
import { connect } from 'react-redux';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { addTool, sortTools } from '../../../flow/edit/action';
import ToolWrapper from './tool-wrapper';
import Tool from './tool';
import ToolsWrapper from './tools-wrapper';
import styles from '../../../index.less';
import { intlShape, injectIntl } from 'react-intl';

const cx = classNames.bind(styles);


class ToolContainer extends React.Component {
  render() {
    const {
      objectType,
      tools,
      addTool,
      sortTools,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    const theme = objTypeAndClassTypeMap[objectType];
    return (
      <Panel panelClasses={classNames(`${theme}-theme-panel`)} panelTitle={formatMessage({ id: 'page.layouts.operates.tools' })}>
        <ToolsWrapper addTool={addTool} selectedTools={tools}>
          {
              tools.length < 1 ?
                <Card bodyStyle={{
                 minHeight: '100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
                > 你还没有Tool，拖动右面tools 至此处
                </Card>
                :
                  tools.map((m, index) => (
                    <ToolWrapper sequence={index} sortTools={sortTools} addTool={addTool} key={m} theme={theme}>
                      <Tool code={m} theme={theme} />
                    </ToolWrapper>
            ))
          }

        </ToolsWrapper>
      </Panel>);
  }
}
ToolContainer.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,
};
const mapStateToProps = ({ setup }) => {
  const {
    editView,
    currentObjectType,
  } = setup.layouts;
  const { tools } = editView;
  return {
    objectType: currentObjectType,
    tools,
  };
};
const mapDispatchToProps = {
  addTool,
  sortTools,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ToolContainer));
