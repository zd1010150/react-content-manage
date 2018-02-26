/* eslint-disable no-mixed-operators,no-plusplus */


import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Section from '../component/section';
import SectionWrapper from '../component/section-wrapper';
import SectionEditAddDialog from '../component/section-edit-add-dialog';
import styles from '../DD-demo.less';
import { toggleSectionAddEditDialog, setSectionAttr, updateSection, moveSection, addSection, addFieldToSection, moveBetweenSection, deleteSection } from '../flow/action';

const cx = classNames.bind(styles);
class sectionsWrapper extends React.Component {
  render() {
    const {
      sections, allFields, uiDialog, toggleSectionAddEditDialog, moveSection, addFieldToSection, moveBetweenSection, addSection, updateSection, setSectionAttr, deleteSection,
    } = this.props;
    return (
      <div className={cx('sections-wrapper')}>
        {
              sections.map(section =>
                (<SectionWrapper key={section.code} sequence={section.sequence} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection}>
                  <Section sections={sections} allFields={allFields} deleteSection={deleteSection} toggleSectionAddEditDialog={toggleSectionAddEditDialog} rows={section.rows} cols={section.cols} code={section.code} sequence={section.sequence} fields={section.fields} label={section.label} addFieldToSection={addFieldToSection} moveBetweenSection={moveBetweenSection} />
                </SectionWrapper>))
          }
          {
            <SectionWrapper sequence={sections.length} toggleSectionAddEditDialog={toggleSectionAddEditDialog} moveSection={moveSection} classes={cx('section-wrapper-last')}/>
          }
        <SectionEditAddDialog {...uiDialog} addSection={addSection} updateSection={updateSection} setSectionAttr={setSectionAttr} toggleSectionAddEditDialog={toggleSectionAddEditDialog}  />
      </div>
    );
  }
}


const mapStateToProps = ({ ddDemo }) => ({
  allFields: ddDemo.fields,
  sections: ddDemo.sections,
  uiDialog: ddDemo.ui && ddDemo.ui.sectionAddEditDialog,
});
const mapDispatchToProp = {
  addFieldToSection,
  moveBetweenSection,
  toggleSectionAddEditDialog,
  setSectionAttr,
  updateSection,
  moveSection,
  addSection,
  deleteSection
};

export default connect(mapStateToProps, mapDispatchToProp)(sectionsWrapper);
