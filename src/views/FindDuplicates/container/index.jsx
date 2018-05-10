import { FindDuplicates } from 'components/page/index';
import React from 'react';
import Enums from 'utils/EnumsManager';
import { getThemeByType } from 'utils/common';

const { ObjectTypes } = Enums;
const { Leads } = ObjectTypes;


const FindDuplicatesWrapper = ({ match }) => {
  const { url, params } = match;
  const { objectId } = params;
  const theme = getThemeByType(Leads);
  return (
    <FindDuplicates
      objectId={objectId}
      objectType={Leads}
      theme={theme}
      withConvert={url.indexOf('/convert/find') !== -1}
    />
  );
};


export default FindDuplicatesWrapper;
