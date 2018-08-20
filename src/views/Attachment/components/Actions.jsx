import { Button, Icon, notification } from 'antd';
import { getObjectInfo, getTheme, hasPhantomId } from 'components/hoc/index';
import { baseUrl } from 'config/env.config';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { tryUpdateAttachmentInfo, setAttachmentInfo } from '../flow/actions';


const propTypes = {
  intl: intlShape.isRequired,
  // TODO: lifted prop check for substore
  attachment: PropTypes.object.isRequired,
};

class Actions extends PureComponent {
  onPhantomSave = (payload, callback) => {
    fetch(`${baseUrl}/admin/files/asset`, {
      credentials: 'include',
      method: 'POST',
      body: payload,
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then((json) => {
      callback(json.data);
    }).catch(() => notification.error({
      message: 'Fail to add attachment.',
    }));
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
      this.onPhantomSave(payload, this.saveNewCallBack);
    } else {
      this.props.tryUpdateAttachmentInfo(id, category, comment);
    }
  }  
  // NOTES: history prop has been introduced when we use getTheme() HOC, so here we skip the wrapper of 'withRouter'
  onCancelClick = () => this.props.history.goBack()

  saveNewCallBack = (data) => {
    this.props.history.replace(`/${this.props.objectType}/${this.props.objectId}/attachments/${data.id}`);
    this.props.setAttachmentInfo({
      ...data,
      category: Number(data.category),
    });
  }

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
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(getObjectInfo(getTheme(hasPhantomId(Actions, 'attachmentId')))));
