/* eslint-disable no-shadow */
import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { objTypeAndClassTypeMap } from 'config/app.config';
import Enum from 'utils/EnumsManager';
import { addModule, sortModules } from '../../../flow/edit/action';
import ModuleWrapper from './module-wrapper';
import Module from './module';
import ModulesWrapper from './modules-wrapper';

const { ColumnsByModule } = Enum;
class ModuleContainer extends React.Component {
  render() {
    const {
      objectType,
      modules,
      addModule,
      sortModules,
      intl,
    } = this.props;
    const theme = objTypeAndClassTypeMap[objectType];
    const { formatMessage } = intl;
    return (<ModulesWrapper addModule={addModule} selectedModules={modules}>
      {
            modules.length < 1 ?
              <Card bodyStyle={{
                 minHeight: '100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              >
                {formatMessage({ id: 'page.layouts.noMoudle' })}
              </Card>
                :
                modules.map((m, index) => (
                  <ModuleWrapper sequence={index} sortModules={sortModules} addModule={addModule} key={m} theme={theme}>
                    <Module code={m} theme={theme} cols={ColumnsByModule[m]} />
                  </ModuleWrapper>
            ))
          }

            </ModulesWrapper>);
  }
}
ModuleContainer.propTypes = {
  objectType: PropTypes.string.isRequired,
};
const mapStateToProps = ({ setup, global }) => {
  const {
    editView,
    currentObjectType,
  } = setup.layouts;
  const { modules } = editView;
  return {
    objectType: currentObjectType,
    modules,
    language: global.language,
  };
};
const mapDispatchToProps = {
  addModule,
  sortModules,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ModuleContainer));
