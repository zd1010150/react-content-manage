/* eslint-disable no-shadow */
import React from 'react';
import { Panel } from 'components/ui/index';
import { TeamTree } from 'components/page/index';

class UITeamTree extends React.Component {
  render() {
    return (
      <Panel>
        <TeamTree />
        <TeamTree canAdd canDelete checkable />
      </Panel>
    );
  }
}


export default UITeamTree;
