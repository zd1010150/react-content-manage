/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';

class Modules extends React.Component {
  render() {
    const {
      modules,
      theme,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div>
        {
                    modules.map(m =>
                      <Panel key={m} panelClasses={`${theme}-theme-panel`} panelTitle={formatMessage({ id: `global.ui.detailModules.${m}` })} />)
                }

      </div>);
  }
}
Modules.propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.string.isRequired,
  modules: PropTypes.array.isRequired,
};


export default injectIntl(Modules);
