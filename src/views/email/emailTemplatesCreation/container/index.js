/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import _ from 'lodash';
import { fetchTeams } from 'store/global/action';
import { connect } from 'react-redux';
import TemplateInformation from './templateInformation';
import TemplateContent from './templateContent';



class EmailTemplatesCreation extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <Fragment>
          <TemplateInformation/>
          <TemplateContent/>
      </Fragment>

    );
  }
}

const mapStateToProps = ({ global }) => ({

});
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplatesCreation);

