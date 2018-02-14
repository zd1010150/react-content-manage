import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { getAbsolutePath } from '../../config/magento.config';


const magentoStaticLink = ({
  href, titleId, aClass, language, intl, title,
}) => {
  const { formatMessage } = intl;
  return (<a href={getAbsolutePath(href, language)} className={aClass} target="_self">{ titleId && titleId.length > 0 ? formatMessage({ id: titleId }) : title }</a>);
};

magentoStaticLink.defaultProps = {
  aClass: '',
  titleId: '',
  title: '',
}
magentoStaticLink.propTypes = {
  href: PropTypes.string.isRequired,
  titleId: PropTypes.string,
  aClass: PropTypes.string,
  language: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  title: PropTypes.string,
};

function mapStateToProps(state) {
  return { language: state.global.language };
}
const MagentoStaticLink = injectIntl(connect(mapStateToProps)(magentoStaticLink));
export default MagentoStaticLink;

