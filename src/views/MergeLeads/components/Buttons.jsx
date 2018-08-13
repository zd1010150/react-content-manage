/* eslint arrow-parens: ["error", "as-needed"] */
import { Button, Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { tryMergeLeads } from '../flow/actions';
import { toApi } from '../flow/utils';

const { MasterKey } = Enums;


const defaultProps = {
  canMerge: false,
};
const propTypes = {
  intl: intlShape.isRequired,
  canMerge: PropTypes.bool,
  mergedData: PropTypes.shape({
    master_record_id: PropTypes.number,
  }).isRequired,
};


class Buttons extends Component {
  onCancelClick = $ => this.props.history.goBack()

  onMergeClick = $ => {
    const {
      intl,
      data,
      keys,
      mergedData,
      tryMergeLeads,
    } = this.props;
    const { formatMessage } = intl;
    // check if some fields miss selection
    let hasFieldMissing = false;
    keys.forEach(key => {
      if (!mergedData.hasOwnProperty(key.key)) {
        hasFieldMissing = true;
      }
    });
    if (hasFieldMissing) {
      return notification.error({
        message: formatMessage({ id: 'global.errors.oneFieldRequired' }),
      });
    }

    const masterRecordId = mergedData[MasterKey];
    return tryMergeLeads({
      merged_ids: data.map(record => record.id),
      lead: toApi(mergedData, keys, data),
      [MasterKey]: masterRecordId,
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
