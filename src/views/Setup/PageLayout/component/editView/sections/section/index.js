/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { objTypeAndClassTypeMap } from 'config/app.config';
import SectionWrapper from './section-wrapper';
import Section from './section';
import SectionEditAddDialog from './section-edit-add-dialog';
import styles from '../../../../index.less';
import {
  toggleSectionAddEditDialog,
  moveSection,
  setCanDrop,
  deleteSection,
  moveBetweenSection,
  addSection,
  updateSection,
  setSectionAttr,
  addFieldToSection,
} from '../../../../flow/edit/action';

const cx = classNames.bind(styles);


class ToolContainer extends React.Component {

  render() {
    const {
      objectType,
      intl,
      sections,
      allFields,
      fieldCanDrop,
      toggleSectionAddEditDialog,
      moveSection,
      setCanDrop,
      deleteSection,
      moveBetweenSection,
      addSection,
      updateSection,
      setSectionAttr,
      addFieldToSection,
      uiDialog,
    } = this.props;
    const { formatMessage } = intl;
    const theme = objTypeAndClassTypeMap[objectType];
    return (
      <div className={cx('sections-wrapper')}>
        {
            sections.length < 1 ? (
              <SectionWrapper sequence={0} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection}>
                <Card >还没有任何section，拖拽右侧的新增section 按钮至此处，生成你第一个section</Card>
              </SectionWrapper>
                )
                :
                sections.map(section =>
                    (<SectionWrapper key={section.code} sequence={section.sequence} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection} >
                      <Section
                        setCanDrop={setCanDrop}
                        fieldCanDrop={fieldCanDrop}
                        sections={sections}
                        allFields={allFields}
                        deleteSection={deleteSection}
                        toggleSectionAddEditDialog={toggleSectionAddEditDialog}
                        rows={section.rows}
                        cols={section.cols}
                        code={section.code}
                        sequence={section.sequence}
                        fields={section.fields}
                        label={section.label}
                        addFieldToSection={addFieldToSection}
                        moveBetweenSection={moveBetweenSection}
                      />
                    </SectionWrapper>))
            }
        {
          <SectionWrapper sequence={sections.length} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection} classes={cx('section-wrapper-last')} />
            }
        <SectionEditAddDialog
          {...uiDialog}
          addSection={addSection}
          updateSection={updateSection}
          setSectionAttr={setSectionAttr}
          toggleSectionAddEditDialog={toggleSectionAddEditDialog}
        />
      </div>);
  }
}
ToolContainer.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,
};
const mapStateToProps = ({ setup }) => {
  const {
    editView,
    currentObjectType,
  } = setup.layouts;
  const {
    sections, ui, fields,
  } = editView;
  return {
    objectType: currentObjectType,
    sections,
    allFields: fields,
    uiDialog: ui.sectionAddEditDialog,
    fieldCanDrop: ui.fieldCanDrop,
  };
};
const mapDispatchToProps = {
  toggleSectionAddEditDialog,
  moveSection,
  setCanDrop,
  deleteSection,
  moveBetweenSection,
  addSection,
  updateSection,
  setSectionAttr,
  addFieldToSection,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ToolContainer));
