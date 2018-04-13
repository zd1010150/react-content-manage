/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { addModule, sortModules } from '../../../flow/edit/action';
import ModuleWrapper from './module-wrapper';
import Module from './module';
import ModulesWrapper from './modules-wrapper';
import styles from '../../../index.less';


const cx = classNames.bind(styles);


class ModuleContainer extends React.Component {
  render() {
    const {
      objectType,
      modules,
      addModule,
      sortModules,
    } = this.props;
    const theme = objTypeAndClassTypeMap[objectType];
    return (<ModulesWrapper addModule={addModule} selectedModules={modules}>
      {
            modules.length < 1 ?
              <Card bodyStyle={{
                 minHeight: '100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              > 你还没有modules，拖动右面module 至此处
              </Card>
                :
                modules.map((m, index) => (
                  <ModuleWrapper sequence={index} sortModules={sortModules} addModule={addModule} key={m} theme={theme}>
                    <Module code={m} theme={theme} />
                  </ModuleWrapper>
            ))
          }

            </ModulesWrapper>);
  }
}
ModuleContainer.propTypes = {
  objectType: PropTypes.string.isRequired,
};
const mapStateToProps = ({ setup }) => {
  const {
    editView,
    currentObjectType,
  } = setup.layouts;
  const { modules } = editView;
  return {
    objectType: currentObjectType,
    modules,
  };
};
const mapDispatchToProps = {
  addModule,
  sortModules,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer);
