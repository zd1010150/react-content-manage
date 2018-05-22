import React from 'react';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { DetailsForm } from '../components/index';


const propTypes = {
  intl: intlShape.isRequired,
};


const ConvertDetailsView = ({
  intl,
  theme,
  ...others
}) => {
  const { formatMessage } = intl;

  return (
    <Panel
      contentClasses="pl-lg pr-lg pt-md pb-md"
      panelClasses="lead-theme-panel"
      panelTitle={formatMessage({ id: 'page.convertDetails.title' })}
    >
      <DetailsForm {...others} />
    </Panel>
  );
};


ConvertDetailsView.propTypes = propTypes;
export default injectIntl(ConvertDetailsView);
