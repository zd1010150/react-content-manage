import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tryFetchAllUsersIfNeeded } from 'store/global/action';
import { SelectionPool } from 'components/ui/index';


class SelectionZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.tryFetchAllUsersIfNeeded();
  }

  handleTagClose = (tagId, isTeam) => {
    console.log('testing');
    console.log(tagId, isTeam);
  }

  render() {
    const { intl, theme, selectedUsers, selectedTeams } = this.props;

    return (
      <div>
        <SelectionPool
          theme={theme}
          users={selectedUsers}
          teams={selectedTeams}
          onTagClose={this.handleTagClose}
          closable
          withIcon
        />
      </div>
    );
  }
}


const mapStateToProps = ({ global }) => ({
  language: global.language,
  users: global.users,
});
const mapDispatchToProps = {
  tryFetchAllUsersIfNeeded,
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectionZone);
