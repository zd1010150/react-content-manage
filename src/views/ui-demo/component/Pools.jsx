import React, { Component, Fragment } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

import Enums from 'utils/EnumsManager';
import { SelectionPool, SearchPool } from 'components/ui/index';

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
    return (
    <Fragment>
      <RadioGroup onChange={this.onRadioChange}>
        {Enums.ThemeTypesInArray.map(type => <Radio key={type} value={type}>{type}</Radio>)}
      </RadioGroup>
      <br/>
      <SelectionPool
        theme={theme}
        selectedUsers={selectedUsers}
        selectedTeams={selectedTeams}
        withIcon
      />
      {/* <SearchPool
        theme={theme}
        selectedUsers={selectedUsers}
        selectedTeams={selectedTeams}
      /> */}
    </Fragment>
    );
  }
}

export default Pools;