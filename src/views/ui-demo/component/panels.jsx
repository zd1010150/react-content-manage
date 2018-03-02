/* eslint-disable no-shadow */
import React from 'react';
import { Button, Radio, Icon } from 'antd';
import { Panel } from 'components/ui/index';


const UIDEMO = () => {
  const actionsLeft = <div><Button className="btn-ellipse ml-sm lead-theme" size="small">mass update</Button><Button className="btn-ellipse ml-sm account-theme" size="small">mass delete</Button></div>;

  return (
    <div>
      <h2 />
      <Panel >
                this is test
      </Panel>
      <h2> panelClass = lead-theme-panel</h2>
      <Panel panelClasses="lead-theme-panel">
              this is test
      </Panel>
      <h2> panelTitle="this is test panel title"</h2>
      <Panel panelTitle="this is test panel title" panelClasses="opport-theme-panel">
              this is test
      </Panel>
      <h2> panelClass = report-theme-panel, panelTitle="this is test panel title"</h2>
      <Panel panelTitle="this is test panel title" panelClasses="report-theme-panel">
              this is test
      </Panel>
      <h2>panel with actionsRight and title</h2>
      <Panel panelTitle="this is test panel title" panelClasses="report-theme-panel" actionsRight={actionsLeft}>
              this is test
      </Panel>
      <h2>panel with actionsRight and actionsLeft</h2>
      <Panel panelClasses="report-theme-panel" actionsLeft={actionsLeft} actionsRight={actionsLeft}>
              this is test
      </Panel>
    </div>
  );
};


export default UIDEMO;
