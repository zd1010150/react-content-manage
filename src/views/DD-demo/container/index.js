/* eslint-disable no-shadow */
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SectionsWrapper from './sections-wrapper';
import AllFieldsWrapper from './all-fileds-wrapper';


class ddDemoView extends React.Component {
  render() {
    return (
      <section className="section section-page">
        <div className="section-content">
          <AllFieldsWrapper />
          <SectionsWrapper />
        </div>
        <div className="section-header" />
      </section>);
  }
}


const DDDemoView = DragDropContext(HTML5Backend)(ddDemoView);
export default DDDemoView;
