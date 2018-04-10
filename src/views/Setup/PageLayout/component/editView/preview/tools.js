/* eslint-disable no-shadow */
import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';

class Tools extends React.Component {
  render() {
    const {
      tools,
      theme,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <Panel panelClasses={classNames(`${theme}-theme-panel`)} panelTitle={formatMessage({ id: 'page.layouts.operates.tools' })} contentClasses="pt-lg pb-lg pr-lg pl-lg">
        {
                    tools.map(t =>
                      (<Button key={t} size="small" className={classNames(`${theme}-theme-btn`, 'mr-lg')}>
                        {formatMessage({ id: `global.ui.detailTools.${t}` })}
                      </Button>))
                }
      </Panel>
    );
  }
}
Tools.propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.string.isRequired,
  tools: PropTypes.array.isRequired,
};


export default injectIntl(Tools);
