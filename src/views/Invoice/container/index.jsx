import { Panel, Section } from 'components/ui/index';
import React, { Component } from 'react';
import { Upload } from '../components/index';

class Invoice extends Component {
  componentDidMount() {
    console.log('mounted!');
  }

  render() {
    return (
      <Panel
        panelClasses='account-theme-panel'
        panelTitle='Adding new invoice'
        // panelClasses={`${theme}-theme-panel`}
        // panelTitle={formatMessage({ id: `${i18n}.${titleId}` })}
      >
        <Section title="Item Description">
          <Upload />
        </Section>
      </Panel>
    );
  }
}


export default Invoice;
