/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';

class GlobalSearch extends React.Component {
  constructor(props) {
    super();
    this.setObjectType(props);
  }


  render() {
      const { formatMessage } = this.props.intl;
    return (<div >
          {
              Object.keys(this.props.result).map(objType => <Panel panelClasses={`${objTypeAndClassTypeMap[objType]}-theme-panel`} panelTitle={formatMessage({ id: `global.properNouns.${objType}` })} >

              </Panel>)
          }
      </div>);
  }
}

const mapStateToProps = ({ globalSearch }) => ({
  result: globalSearch,
});

export default connect(mapStateToProps)(injectIntl(GlobalSearch));
