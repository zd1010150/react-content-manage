import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleOption from './singleOption';
import { deleteFromSection } from '../../../../flow/edit/action';
import SideViewWrapper from './siderViewWrapper';

class SectionSiderView extends React.Component {
  render() {
    const {
      fields,
      deleteFromSection,
    } = this.props;
    return (
      <SideViewWrapper deleteFromSection={deleteFromSection}>
        { fields.map(f => (<SingleOption
          key={f.id}
          id={f.id}
          label={f.label}
          isLayoutRequired={f.is_layout_required}
          isSelected={f.isSelected}
        />))}
      </SideViewWrapper>);
  }
}
SectionSiderView.propTypes = {
  fields: PropTypes.array.isRequired,
};

const mapStateToProps = ({ setup }) => {
  const { fields } = setup.layouts.editView;
  return {
    fields,
  };
};
const mapDispatchToProps = {
  deleteFromSection,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionSiderView);
