import React, { Component } from 'react';
import { Panel, Section } from 'components/ui/index';
import * as ChildComponents from '../components/index';


class ObjectView__REFACTORED extends Component {
  componentDidMount() {}
  render() {
    const theme = 'lead';
    console.dir(ChildComponents);
    console.dir(Panel);
    const A = ChildComponents['FilterCriteria'];
    return (
      <Panel
        panelClasses={`${theme}-theme-panel`}
        // panelTitle={formatMessage({ id: `${i18n}.${titleId}` })}
      >
        <Section>
          <A />
        </Section>
      </Panel>
    );
  }
}

export default ObjectView__REFACTORED;
