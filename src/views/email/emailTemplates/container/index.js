/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { fetchTeams } from 'store/global/action';
import {
    setEditFolderViewVisible,
} from '../flow/action';
import { connect } from 'react-redux';
import EditView from './editDepartmentView';
import EmailTemplateDetail from './emailTemplateDetail';
import EmailEditFolder from './emailEditFolder';


class EmailTemplates extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
  }

  render() {
    const { teams, isEditFolderViewVisible } = this.props;
    return (
      <Fragment>
        <EditView />
          {!isEditFolderViewVisible ? <EmailTemplateDetail/> : <EmailEditFolder/>}

      </Fragment>

    );
  }
}

const mapStateToProps = ({ global, setup }) => {
    const { emailTemplates } = setup;
    return {
        teams: global.settings.teams,
        isEditFolderViewVisible: emailTemplates.ui.isEditFolderViewVisible,
    };
};

const mapDispatchToProps = {
    fetchTeams,
    setEditFolderViewVisible
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplates);

