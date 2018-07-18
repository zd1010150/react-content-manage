/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { objTypeAndClassTypeMap } from 'config/app.config';
import SectionWrapper from './section-wrapper';
import Section from './section';
import SectionEditAddDialog from './section-edit-add-dialog';
import SectionFieldEditDialog from './section-field-edit-dialog';

import styles from '../../../../index.less';
import {
  toggleSectionAddEditDialog,
  moveSection,
  setCanDrop,
  deleteSection,
  moveFieldsBetweenSection,
  addSection,
  updateSection,
  setSectionAttr,
  addFieldToSection,
  deleteFromSection,
  setEditField,
  changeFieldAttr,
  setShowValue,
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
      moveFieldsBetweenSection,
      addSection,
      updateSection,
      setSectionAttr,
      addFieldToSection,
      uiDialog,
      deleteFromSection,
      setEditField,
      fieldEditDialog,
      changeFieldAttr,
      setShowValue,
    } = this.props;
    const { formatMessage } = intl;
    const theme = objTypeAndClassTypeMap[objectType];

    return (
      <Panel
        panelClasses={classNames(`${theme}-theme-panel`)}
        panelTitle={formatMessage({ id: 'page.layouts.layoutDetail' }, { type: formatMessage({ id: `global.properNouns.${objectType}` }) })}
      >
        {
            sections.length < 1 ? (
              <SectionWrapper theme={theme} sequence={0} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection}>
                <Card>还没有任何section，拖拽右侧的新增section 按钮至此处，生成你第一个section</Card>
              </SectionWrapper>
                )
                :
                sections.map(section =>
                    (<SectionWrapper theme={theme} key={section.code} sequence={section.sequence} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection} >
                      <Section
                        theme={theme}
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
                        moveFieldsBetweenSection={moveFieldsBetweenSection}
                        deleteFromSection={deleteFromSection}
                        setEditField={setEditField}
                      />
                    </SectionWrapper>))
            }
        {
          <SectionWrapper sequence={sections.length} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection} classes={cx('section-wrapper-last')} theme={theme} />
            }
        <SectionEditAddDialog
          {...uiDialog}
          addSection={addSection}
          updateSection={updateSection}
          setSectionAttr={setSectionAttr}
          toggleSectionAddEditDialog={toggleSectionAddEditDialog}
        />
        <SectionFieldEditDialog
          fieldEditDialog={fieldEditDialog}
          setEditField={setEditField}
          changeFieldAttr={changeFieldAttr}
          setShowValue={setShowValue}
        />
      </Panel>);
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
    fieldEditDialog: ui.fieldEditDialog,
    fieldCanDrop: ui.fieldCanDrop,
  };
};
const mapDispatchToProps = {
  toggleSectionAddEditDialog,
  moveSection,
  setCanDrop,
  deleteSection,
  moveFieldsBetweenSection,
  addSection,
  updateSection,
  setSectionAttr,
  addFieldToSection,
  deleteFromSection,
  setEditField,
  changeFieldAttr,
  setShowValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ToolContainer));
