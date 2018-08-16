import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTheme, isPhantom } from 'components/hoc/index';
import { Panel } from 'components/ui/index';
import { NewAttachment, ExistAttachment, Actions } from '../components/index';


// TODO: HOC props may not be needed if we fix them in HOC itself
const defaultProps = {};
const propTypes = {
  isPhantom: PropTypes.bool.isRequired,
};

class Attachment extends Component {
  componentDidMount() {
    if (!this.props.isPhantom) {
      // try fetch data
    }
  }

  render() {
    const { theme } = this.props;
    return (
      <Panel
        // panelTitle={formatMessage({ id: `${i18n}.title` })}
        panelClasses={`${theme}-theme-panel`}
        contentClasses="pl-lg pr-lg pt-md pb-md"
      >
        {this.props.isPhantom ? <NewAttachment /> : <ExistAttachment />}
        <Actions />
      </Panel>
    );
  }
}

Attachment.defaultProps = defaultProps;
Attachment.propTypes = propTypes;
export default getTheme(isPhantom(Attachment, 'attachmentId'));
