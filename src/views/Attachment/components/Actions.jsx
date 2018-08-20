import { Button, Icon, notification } from 'antd';
import { getObjectInfo, getTheme, hasPhantomId } from 'components/hoc/index';
import { baseUrl } from 'config/env.config';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { hideLoading, showLoading } from 'store/loading/loadingAction';
import { setAttachmentInfo, tryUpdateAttachmentInfo } from '../flow/actions';


const propTypes = {
  intl: intlShape.isRequired,
  // TODO: lifted prop check for substore
  attachment: PropTypes.object.isRequired,
};

class Actions extends PureComponent {
  onPhantomSave = (payload, callback) => {
    const me = this;
    fetch(`${baseUrl}/admin/files/asset`, {
      credentials: 'include',
      method: 'POST',
      body: payload,
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then(() => {
      me.props.hideLoading();
      notification.success({
        message: me.props.intl.formatMessage({ id: 'global.info.post' }),
      });
      callback();
    }).catch(() => {
      me.props.hideLoading();
      notification.error({
        message: 'Fail to add attachment.',
      });
    });
  }

  onSaveClick = () => {
    const { attachment, isPhantom, objectId, objectType } = this.props;
    const { id, category, comment, file } = attachment;
    if (isPhantom) {
      // TODO: update global request to fit different request type of request
      const payload = new FormData();
      const data = {
        ownerId: objectId,
        ownerType: objectType,
        category,
        document: file,
        comment,
      };
      Object.keys(data).forEach(key => payload.append(key, data[key]));
      this.props.showLoading();
      this.onPhantomSave(payload, this.onCancelClick);
    } else {
      this.props.tryUpdateAttachmentInfo(id, category, comment);
      this.onCancelClick();
    }
  }
  // NOTES: history prop has been introduced when we use getTheme() HOC, so here we skip the wrapper of 'withRouter'
  onCancelClick = () => this.props.history.goBack()

  render() {
    const { theme, intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.button';

    return (
      <div>
        <Button
          className={`${theme}-theme-btn mr-sm`}
          onClick={this.onSaveClick}
        >
          <Icon type="save" className="font-sm icon-thinner" />
          {formatMessage({ id: `${i18n}.save` })}
        </Button>
        <Button onClick={this.onCancelClick}>
          <Icon type="close" className="font-sm icon-thinner" />
          {formatMessage({ id: `${i18n}.cancel` })}
        </Button>
      </div>
    );
  }
}

Actions.propTypes = propTypes;
const mapStateToProps = ({ global, attachment }) => ({
  language: global.language,
  attachment,
});
const mapDispatchToProps = {
  tryUpdateAttachmentInfo,
  setAttachmentInfo,
  showLoading,
  hideLoading,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(getObjectInfo(getTheme(hasPhantomId(Actions, 'attachmentId')))));
