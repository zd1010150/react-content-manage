import { getTheme, hasPhantomId } from 'components/hoc/index';
import { Panel } from 'components/ui/index';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Actions, ExistAttachment, NewAttachment } from '../components/index';
import { reset, tryFetchAttachmentInfo } from '../flow/actions';


const propTypes = {
  intl: intlShape.isRequired,
};

class Attachment extends Component {
  componentDidMount() {
    const { isPhantom, targetId } = this.props;
    if (!isPhantom) {
      this.props.tryFetchAttachmentInfo(targetId);
    }
  }
  componentWillUnmount() { this.props.reset(); }

  render() {
    const { theme, intl, isPhantom } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.Attachment.titles';
    const titleKey = isPhantom ? 'add' : 'edit';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18n}.${titleKey}` })}
        panelClasses={`${theme}-theme-panel`}
        contentClasses="pl-lg pr-lg pt-md pb-md"
      >
        {isPhantom ? <NewAttachment /> : <ExistAttachment />}
        <Actions />
      </Panel>
    );
  }
}

Attachment.propTypes = propTypes;
const mapDispatchToProps = {
  tryFetchAttachmentInfo,
  reset,
};
export default connect(
  null,
  mapDispatchToProps,
)(injectIntl(getTheme(hasPhantomId(Attachment, 'attachmentId'))));
