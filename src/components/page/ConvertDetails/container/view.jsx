import React from 'react';
import { Form, Select, Row, Col } from 'antd';
import { Panel, StyledModal } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { DetailsForm } from '../components/index';


const propTypes = {
  intl: intlShape.isRequired,
};


const ConvertDetailsView = ({
  intl,
  theme,
}) => {
  const { formatMessage } = intl;

  return (
    <Panel
      contentClasses="pl-lg pr-lg pt-md pb-md"
      panelClasses={`${theme}-theme-panel`}
      panelTitle={formatMessage({ id: 'page.convertDetails.title' })}
    >
      <DetailsForm
        accountStatuses={[]}
      />
    </Panel>
  );
};


ConvertDetailsView.propTypes = propTypes;
export default injectIntl(ConvertDetailsView);
