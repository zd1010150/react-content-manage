/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Section from '../component/sections/section';
import SectionWrapper from '../component/sections/section-wrapper';
import SectionEditAddDialog from '../component/sections/section-edit-add-dialog';
import styles from '../DD-demo.less';
import { toggleSectionAddEditDialog, setSectionAttr, updateSection, moveSection, addSection, addFieldToSection, moveBetweenSection, deleteSection, setCanDrop } from '../flow/action';

const cx = classNames.bind(styles);
class sectionsWrapper extends React.Component {
  render() {
    const {
      sections, allFields, uiDialog, toggleSectionAddEditDialog, moveSection, addFieldToSection, moveBetweenSection, addSection, updateSection, setSectionAttr, deleteSection, fieldCanDrop, setCanDrop,
    } = this.props;
    return (
      <div className={cx('sections-wrapper')}>
        {
              sections.map(section =>
                (<SectionWrapper key={section.code} sequence={section.sequence} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection} >
                  <Section setCanDrop={setCanDrop} fieldCanDrop={fieldCanDrop} sections={sections} allFields={allFields} deleteSection={deleteSection} toggleSectionAddEditDialog={toggleSectionAddEditDialog} rows={section.rows} cols={section.cols} code={section.code} sequence={section.sequence} fields={section.fields} label={section.label} addFieldToSection={addFieldToSection} moveBetweenSection={moveBetweenSection} />
                </SectionWrapper>))
          }
        {
          <SectionWrapper sequence={sections.length} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection} classes={cx('section-wrapper-last')} />
          }
        <SectionEditAddDialog {...uiDialog} addSection={addSection} updateSection={updateSection} setSectionAttr={setSectionAttr} toggleSectionAddEditDialog={toggleSectionAddEditDialog} />
      </div>
    );
  }
}


const mapStateToProps = ({ ddDemo }) => ({
  allFields: ddDemo.fields,
  sections: ddDemo.sections,
  uiDialog: ddDemo.ui && ddDemo.ui.sectionAddEditDialog,
  fieldCanDrop: ddDemo.ui && ddDemo.ui.fieldCanDrop,
});
const mapDispatchToProp = {
  addFieldToSection,
  moveBetweenSection,
  toggleSectionAddEditDialog,
  setSectionAttr,
  updateSection,
  moveSection,
  addSection,
  deleteSection,
  setCanDrop,
};

export default connect(mapStateToProps, mapDispatchToProp)(sectionsWrapper);
