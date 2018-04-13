import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Enums from 'utils/EnumsManager';
import SingleOption from './singleOption';
import { deleteTool } from '../../../flow/edit/action';
import SideViewWrapper from './siderViewWrapper';

class toolSiderView extends React.Component {
  render() {
    const {
      selectedTools,
      deleteTool,
        theme,
    } = this.props;
    return (
      <SideViewWrapper deleteTool={deleteTool} theme={theme}>
        { Object.keys(Enums.DetailTools).map(m => (<SingleOption
          key={m}
          code={m}
          isLayoutRequired={false}
          isSelected={selectedTools.indexOf(m) > -1}
        />))}
      </SideViewWrapper>);
  }
}
toolSiderView.propTypes = {
  selectedTools: PropTypes.array.isRequired,
};

const mapStateToProps = ({ setup }) => {
  const { tools } = setup.layouts.editView;
  return {
    selectedTools: tools,
  };
};
const mapDispatchToProps = {
  deleteTool,
};

export default connect(mapStateToProps, mapDispatchToProps)(toolSiderView);
