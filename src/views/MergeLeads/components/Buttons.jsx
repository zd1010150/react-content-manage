import { Button, Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tryMergeLeads } from '../flow/actions';
import Enums from 'utils/EnumsManager';
const { MasterKey } = Enums;


const defaultProps = {
  canMerge: false,
  mergedRecord: {},
};
const propTypes = {
  intl: intlShape.isRequired,
  canMerge: PropTypes.bool.isRequired,
  mergedRecord: PropTypes.shape({
    masterId: PropTypes.number,
  }).isRequired,
};


class Buttons extends Component {
  onCancelClick = $ => this.props.history.goBack()

  onMergeClick = $ => {
    const { data, keys, mergedData, tryMergeLeads } = this.props;
    // check if some fields miss selection
    let hasFieldMissing = false;
    keys.forEach(key => {
      if (key.key !== MasterKey && !mergedData.hasOwnProperty(key.key)) {
        hasFieldMissing = true;
      }
    });
    if (hasFieldMissing) {
      return notification['warning']({
        message: 'Missing some fields',
      });;
    }
    return tryMergeLeads({
      merged_ids: data.map(record => record.id),
      lead: mergedData,
    });
  }

  render() {
    const { intl, canMerge } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.button';

    return (
      <Fragment>
        <Button
          className="lead-theme-btn mr-sm"
          disabled={!canMerge}
          size="small"
          onClick={this.onMergeClick}
        >
          <Icon size="small" type="save" />
          {formatMessage({ id: `${i18n}.merge` })}
        </Button>
        <Button
          size="small"
          onClick={this.onCancelClick}
        >
          <Icon size="small" type="close" />
          {formatMessage({ id: `${i18n}.cancel` })}
        </Button>
      </Fragment>
    );
  }
}


Buttons.defaultProps = defaultProps;
Buttons.propTypes = propTypes;
const mapStateToProps = ({ mergence }) => ({
  data: mergence.data,
  keys: mergence.keys,
  mergedData: mergence.mergedData,
});
const mapDispatchToProps = {
  tryMergeLeads,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(Buttons)));