/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Field from './field';
import Section from './section';
import AllFields from './allFields';
import DragLayer from './dragLayer';
import BodyWrapper from './bodyWrapper';

import { setCanDrop } from './flow/action';

const fields = [{ title: 'normal field', isLayoutRequired: false }, { title: 'necessary field', isLayoutRequired: true }];

class ddDemoView extends React.Component {
  render() {
    const { setCanDrop, canDrop } = this.props;
    return (
        <BodyWrapper setCanDrop={setCanDrop}>
          <section className="section section-page">
            <div className="section-content">
              <AllFields setCanDrop={setCanDrop} />
              <Section setCanDrop={setCanDrop} />
              {
                      fields.map(f => <Field key={f.title} title={f.title} isLayoutRequired={f.isLayoutRequired} setCanDrop={setCanDrop} />)
                  }
              <DragLayer canDrop={canDrop} />

            </div>
            <div className="section-header" />
          </section>
        </BodyWrapper>);
  }
}
const mapStateToProps = ({ dragPreview }) => ({
  canDrop: dragPreview.ui && dragPreview.ui.fieldCanDrop,
});
const mapDispatchToProp = {
  setCanDrop,
};
const DDDemoView = connect(mapStateToProps, mapDispatchToProp)(ddDemoView);
export default DDDemoView;
