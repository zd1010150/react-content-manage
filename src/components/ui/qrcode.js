import React from 'react';
import qrImage from 'qr-image';
import PropTypes from 'prop-types';

const ReactQR = ({
  url, width, height, classes, margin,
}) => {
  const pngBuffer = qrImage.imageSync(url, { type: 'png', margin });
  const dataURI = `data:image/png;base64,${pngBuffer.toString('base64')}`;
  return (
    <img className={classes} src={dataURI} style={{ width: `${width}`, height: `${height}` }} alt="qr code" />
  );
};
ReactQR.defaultProps = {
  width: '50px',
  height: '50px',
  classes: '',
  margin: 1,
};
ReactQR.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  classes: PropTypes.string,
  margin: PropTypes.number,
};
export default ReactQR;
