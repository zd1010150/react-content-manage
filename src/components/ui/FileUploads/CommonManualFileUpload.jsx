/**
 * CommonManualFileUpload is a wrapper component to deal with style and layout based on ManualFileUpload component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ManualFileUpload } from 'components/ui/index';
import { Row, Col } from 'antd';


// Props related to the ManualFileUpload are left to the component itself
// only props dedicated to this component will be checked.
const defaultProps = {
  labelText: 'Attachment',
  // If label and upload component should be on the same line
  // Note: this prop is different with horizontal cls in ManualFileUpload
  horizontal: false,
};
const propTypes = {
  labelText: PropTypes.string,
  horizontal: PropTypes.bool,
};


const CommonManualFileUpload = ({
  labelText,
  horizontal,
  ...others
}) => (
  <Row>
    {horizontal ? (
      <Col>
        <label>{labelText}</label>
      </Col>
    ) : null}
    <Col>
      {!horizontal ? <label>{labelText}</label> : null}
      <ManualFileUpload {...others} />
    </Col>
  </Row>
);


CommonManualFileUpload.defaultProps = defaultProps;
CommonManualFileUpload.propTypes = propTypes;
export default CommonManualFileUpload;
