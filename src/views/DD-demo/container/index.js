/* eslint-disable no-shadow */
import React from 'react';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import BodyWrapper from '../component/dragLayer/bodyWrapper';
import DragLayer from '../component/dragLayer/dragLayer';
import SectionsWrapper from './sections-wrapper';
import AllFieldsWrapper from './all-fileds-wrapper';
import { setCanDrop } from '../flow/action';

class ddDemoView extends React.Component {
  render() {
    const { setCanDrop, canDrop } = this.props;
    return (
      <BodyWrapper setCanDrop={setCanDrop}>
        <section className="section section-page">
          <div className="section-content">
            <AllFieldsWrapper />
            <SectionsWrapper />
          </div>
          <div className="section-header" />
        </section>
        <DragLayer canDrop={canDrop} />
      </BodyWrapper>
    );
  }
}

ddDemoView.propTypes = {
  setCanDrop: PropTypes.func.isRequired,
  canDrop: PropTypes.bool.isRequired,
};
const mapStateToProps = ({ ddDemo }) => ({
  canDrop: ddDemo.ui && ddDemo.ui.fieldCanDrop,
});
const mapDispatchToProp = {
  setCanDrop,
};

const DDDemoView = DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProp)(ddDemoView));
export default DDDemoView;
