/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import Enum from 'utils/EnumsManager';

const { ColumnsByModule } = Enum;
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
                      (<Panel contentClasses="pb-md" key={m} panelClasses={`${theme}-theme-panel`} panelTitle={formatMessage({ id: `global.ui.detailModules.${m}` })} >
                        <table style={{ width: '100%' }}>
                          <thead className="ant-table-thead">
                            <tr>
                              { ColumnsByModule[m].map(c => <th key={c.dataIndex}>{ formatMessage({ id: c.titleId })}</th>) }

                            </tr>
                          </thead>
                        </table>
                      </Panel>))
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
