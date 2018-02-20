/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFieldToSection, deleteFromSection, moveBetweenSection } from '../flow/action';
import Section from '../component/section';
import AllFields from '../component/allFields';

class ddDemoView extends React.Component {
  render() {
    const { allFields, sections } = this.props;
    return (
      <section className="section section-page">
        <div className="section-content">
          <AllFields fields={allFields} />
          {
              sections.map(section => <Section key={section.code} code={section.code} sequence={section.sequence} fields={section.fields} label={section.label} />)
            }
        </div>
        <div className="section-header" />
      </section>);
  }
}

ddDemoView.defaultProps = {
  allFields: [],
  sections: [],
};
ddDemoView.propTypes = {
  allFields: PropTypes.array,
  sections: PropTypes.array,
};
const mapStateToProps = ({ ddDemo }) => ({
  allFields: ddDemo.fields,
  sections: ddDemo.sections,
});
const mapDispatchToProp = {
  addFieldToSection,
  deleteFromSection,
  moveBetweenSection,
};

const DDDemoView = connect(mapStateToProps, mapDispatchToProp)(ddDemoView);
export default DDDemoView;
