import React, { Component, Fragment } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

import Enums from 'utils/EnumsManager';
import { SelectionPool, SearchPool } from 'components/ui/index';

const apis = [
  {
    key: 'theme',
    type: 'string',
    value: 'One of the values from ThemeTypes in Enums'
  },
  {
    key: 'users',
    type: 'array',
    value: 'All selected/available users. Each user is a object, at least contains id and name properties.'
  },
  {
    key: 'teams',
    type: 'array',
    value: 'All selected/available teams. Each team is a object, at least contains id and name properties.'
  },
  {
    key: 'onTagClick',
    type: 'func',
    value: 'A handler is triggered after click on the tag. (id, isTeam) => {}'
  },
  {
    key: 'onTagDoubleClick',
    type: 'func',
    value: 'A handler is triggered after double click on the tag. (id, isTeam) => {}'
  },
  {
    key: 'onTagClose',
    type: 'func',
    value: 'A handler is triggered after close icon is clicked. (id, isTeam) => {}'
  },
  {
    key: 'closable',
    type: 'boolean',
    value: 'Show or hide the close icon after tag text. Default is false.'
  },
  {
    key: 'withIcon',
    type: 'boolean',
    value: 'Show or hide the user/team tag front icon. Default is false.'
  },
];
const searchPoolApis = [
  {
    key: 'title',
    type: 'string',
    value: 'Any department name or default title when no department is selected. Either title is not empty string or withFilter is true, the header will display.'
  },
  {
    key: 'withFilter',
    type: 'boolean',
    value: 'Show or hide the filter on header. The filter will only filter users data based on current requirements.'
  },
];

class Pools extends Component {
  state = {
    theme: Enums.ThemeTypes.Leads,
    selectedUsers: [
      {
        "id": 1,
        "name": "u1-t1",
        "email": "admin1@acy.com",
        "team_id": 1,
        "time_zone": null,
        "start_work_time": null,
        "end_work_time": null,
        "created_at": "2018-03-29 05:26:41",
        "updated_at": "2018-03-29 05:26:41",
        "deleted_at": null
      },
      {
        "id": 2,
        "name": "u2-t2",
        "email": "admin2@acy.com",
        "team_id": 2,
        "time_zone": null,
        "start_work_time": null,
        "end_work_time": null,
        "created_at": "2018-03-29 05:26:41",
        "updated_at": "2018-03-29 05:26:41",
        "deleted_at": null
      },
      {
        "id": 3,
        "name": "u3-t3",
        "email": "admin3@acy.com",
        "team_id": 3,
        "time_zone": null,
        "start_work_time": null,
        "end_work_time": null,
        "created_at": "2018-03-29 05:26:41",
        "updated_at": "2018-03-29 05:26:41",
        "deleted_at": null
      },
      {
        "id": 4,
        "name": "u4-t4",
        "email": "admin4@acy.com",
        "team_id": 4,
        "time_zone": null,
        "start_work_time": null,
        "end_work_time": null,
        "created_at": "2018-03-29 05:26:41",
        "updated_at": "2018-03-29 05:26:41",
        "deleted_at": null
      },
      {
        "id": 5,
        "name": "u5-t5",
        "email": "admin5@acy.com",
        "team_id": 5,
        "time_zone": null,
        "start_work_time": null,
        "end_work_time": null,
        "created_at": "2018-03-29 05:26:42",
        "updated_at": "2018-03-29 05:26:42",
        "deleted_at": null
      }
    ],
    selectedTeams: [
      {
        "id": 1,
        "name": "team1",
        "parent_id": 0,
        "display_num": 0,
        "description": null,
        "child_team_rec": [],
      }
    ],
  }

  onRadioChange = e => this.setState({ theme: e.target.value })

  render() {
    const { theme, selectedUsers, selectedTeams } = this.state;
    const pStyle = {
      margin: 0,
      color: '#09c',
    };
    const docStyle = {
      margin: 0,
      fontSize: 14,
    };
    return (
    <Fragment>
      <RadioGroup onChange={this.onRadioChange} defaultValue={theme}>
        {Enums.ThemeTypesInArray.map(type => <Radio key={type} value={type}>{type}</Radio>)}
      </RadioGroup>
      <br/><br/>
      <h2><b>&lt;SelectionPool /&gt;</b></h2>
      <p style={pStyle}><b>Description</b></p>
      <p style={pStyle}>A tags container lists all users and teams. The tag is removable. Click, double click and close handlers can be attached to each tag. Under the hood, we use &lt;Tag&gt; component from the ant design library.</p>
      <br />
      <p style={docStyle}><b>APIs</b></p>
      {apis.map((api, i) => (
        <p key={i} style={docStyle}>
          <b>{api.key} - </b>
          [{api.type}]
          <br/>
          {api.value}
        </p>
      ))}
      <br/>
      <SelectionPool
        theme={theme}
        users={selectedUsers}
        teams={selectedTeams}
        closable
        withIcon
      />
      <br/>
      <hr/>
      <br/>
      <h2><b>&lt;SearchPool /&gt;</b></h2>
      <p style={pStyle}><b>Description</b></p>
      <p style={pStyle}>Same as above but with filter and title</p>
      <br />
      <p style={docStyle}><b>APIs</b></p>
      <p style={pStyle}>Besides the above APIs for SelectionPool, more APIs are exposed by SearchPool component.</p>
      {searchPoolApis.map((api, i) => (
        <p key={i} style={docStyle}>
          <b>{api.key} - </b>
          [{api.type}]
          <br/>
          {api.value}
        </p>
      ))}
      <br/> 
      <SearchPool
        theme={theme}
        users={selectedUsers}
        teams={selectedTeams}
        withFilter
        withIcon
      />
    </Fragment>
    );
  }
}

export default Pools;