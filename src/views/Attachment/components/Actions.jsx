import { Button, Icon } from 'antd';
import { getTheme } from 'components/hoc/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { tryUpdateAttachmentInfo } from '../flow/actions';


const propTypes = {
  intl: intlShape.isRequired,
  // TODO: lifted prop check for substore
  attachment: PropTypes.object.isRequired,
};

class Actions extends PureComponent {
  onSaveClick = () => {
    const { attachment } = this.props;
    const { id, category, comment } = attachment;
    this.props.tryUpdateAttachmentInfo(id, category, comment);
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
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(getTheme(Actions)));
