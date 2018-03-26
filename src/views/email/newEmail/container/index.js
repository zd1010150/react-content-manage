/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { fetchTeams } from 'store/global/action';
import { connect } from 'react-redux';
import NewEmail from './newEmail';





class EmailContainer extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <Fragment>
          <NewEmail/>
      </Fragment>

    );
  }
}

const mapStateToProps = ({ global }) => ({

});
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer);

