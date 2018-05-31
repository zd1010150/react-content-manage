/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { objTypeAndClassTypeMap } from 'config/app.config';
import Tools from './tools';
import Modules from './modules';
import Sections from './sections';
import styles from '../../../index.less';

const cx = classNames.bind(styles);

class PreviewContainer extends React.Component {
  render() {
    const {
      objectType,
      tools,
      sections,
      modules,
    } = this.props;
    const theme = objTypeAndClassTypeMap[objectType];
    return (
      <div className={classNames(cx('preview-wrapper'))}>
        <Tools theme={theme} tools={tools} />
        <Sections theme={theme} sections={sections} />
        <Modules theme={theme} modules={modules} />
      </div>);
  }
}
PreviewContainer.propTypes = {
  objectType: PropTypes.string.isRequired,
};
const mapStateToProps = ({ setup, global }) => {
  const {
    editView,
    currentObjectType,
  } = setup.layouts;
  const { tools, sections, modules } = editView;
  return {
    objectType: currentObjectType,
    tools,
    sections,
    modules,
    language: global.language,
  };
};


export default connect(mapStateToProps)(PreviewContainer);
