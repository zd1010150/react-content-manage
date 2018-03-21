import React from 'react';
import { Section } from 'components/ui/index';
import { Button } from 'antd';

const Sections = _ => (
  <div>
    <h4>Collapsible section without body</h4>
    <Section
      collapsible
      style={{background: '#fff'}}
      title="collapsible section example without body"
      titleStyle={{background: '#09c', color: '#fff'}}
      body={null} />
    <br /><br />
    <h4>Collapsible section with body</h4>
    <Section
      collapsible
      style={{background: '#fff'}}
      titleStyle={{background: '#09c', color: '#fff'}}
      title="collapsible section example with body"
      body={<Button>I'm part of the section body</Button>} />
    <br /><br />
    <h4>Normal Section Example</h4>
    <Section
      style={{background: '#fff'}}
      titleStyle={{background: '#09c', color: '#fff'}}
      title="collapsible section example without body"
      body={<p>This is a paragraph in body</p>} />
  </div>
);

export default Sections;
