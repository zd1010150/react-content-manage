import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Enums from 'utils/EnumsManager';
import SingleOption from './singleOption';
import { deleteModule } from '../../../flow/edit/action';
import SideViewWrapper from './siderViewWrapper';

class moduleSiderView extends React.Component {
  render() {
    // noinspection JSAnnotator
    const {
      selectedModules,
      deleteModule,
      theme,
      objectType,
    } = this.props;
    return (
      <SideViewWrapper deleteModule={deleteModule} theme={theme}>
        { Object.keys(Enums.DetailModulesByObjectType[objectType]).map(m => (<SingleOption
          key={m}
          code={m}
          isLayoutRequired={false}
          isSelected={selectedModules.indexOf(m) > -1}
        />))}
      </SideViewWrapper>);
  }
}
moduleSiderView.propTypes = {
  selectedModules: PropTypes.array.isRequired,
};

const mapStateToProps = ({ setup }) => {
  const { modules } = setup.layouts.editView;
  return {
    selectedModules: modules,
  };
};
const mapDispatchToProps = {
  deleteModule,
};

export default connect(mapStateToProps, mapDispatchToProps)(moduleSiderView);
