import React from 'react';
import { Link } from 'react-router-dom';

const FilterCriteriaWrapper = () => {
  return (
    <div>
      <h2>API Doc - FilterCriteria (Common component)</h2>
      <p>Usage: wrap the common component with a smart component communicates with redux</p>
      <h3>FilterCriteria props:</h3>
      
      <h3>General</h3>
      <p style={{color:'#00BCD4'}}><b>theme</b> [string]</p>
      <p>The value should be listed in ThemeTypes of EnumsManager. It can be computed by url path automatically with getThemeByType, or manually assign.</p>
      <br /><br />


      <h3>Top Selection (may change in the future for better extension purpose)</h3>
      <p style={{color:'#00BCD4'}}><b>enableTopSelection</b> [bool]</p>
      <p>Show or hide the top selection component</p>
      <p style={{color:'#00BCD4'}}><b>handleUserTypeChange</b> [function]</p>
      <p>Handler when user selection changed</p>
      <br /><br />


      <h3>Bottom Checkbox (may change in the future for better extension purpose)</h3>
      <p style={{color:'#00BCD4'}}><b>enableCheckbox</b> [bool]</p>
      <p>Show or hide the checkbox component</p>
      <p style={{color:'#00BCD4'}}><b>handleCheckboxChange</b> [function]</p>
      <p>Handler when checkbox state changed</p>
      <br /><br />


      <h3>Filters</h3>
      <p style={{color:'#00BCD4'}}><b>fields</b> [array]</p>
      <p>All available fields for user to select</p>
      <p style={{color:'#00BCD4'}} ><b>conditions</b> [array]</p>
      <p>All possible conditions to choose, get from global settings</p>
      <p style={{color:'#00BCD4'}}><b>filters</b> [array]</p>
      <p>All added filters, each filter is an object that at least has following properties -> fieldId, displayNum, conditionId, value, type. More detail please consider the example in Leads View Filter</p>
      <p style={{color:'#00BCD4'}}><b>handleFieldChange</b> [function]</p>
      <p>Handler when a specific field is changed, this will affect the type of value field</p>
      <p style={{color:'#00BCD4'}}><b>handleConditionChange</b> [function]</p>
      <p>Handler when new condition is selected</p>
      <p style={{color:'#00BCD4'}}><b>handleFilterValueChange</b> [function]</p>
      <p>Handler when value field is changed</p>
      <p style={{color:'#00BCD4'}}><b>handleFilterRemove</b> [function]</p>
      <p>Handler when delete icon is clicked</p>
      <br /><br />

      <h3>Buttons</h3>
      <p style={{color:'#00BCD4'}}><b>type</b> [string]</p>
      <p>Passed in as a prop from parent component, for styling purpose</p>
      <p style={{color:'#00BCD4'}}><b>handleAddNewClick</b> [function]</p>
      <p>Add new filter and should sync with redux</p>
      <br /><br />

      <h3>Condition Logic</h3>
      <p style={{color:'#00BCD4'}}><b>logicText</b> [string]</p>
      <p>The text of filter logic. Has some restrictions but not added yet.</p>
      <p style={{color:'#00BCD4'}}><b>handleLogicChange</b> [function]</p>
      <p>Sync the text with redux</p>

      <br /><br />
      <Link style={{ color: '#09c' }} to='/leads/views/0000-0000'>
        Please take close look at the working example in Leads View Filter
      </Link>
    </div>
  );
};

export default FilterCriteriaWrapper;

