import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Input, Button, Radio } from 'antd';

import Container from '../components/Container';
import RadioGroup from 'views/ui-demo/component/radios';
import FloatingLabelInput from 'components/ui/FloatingLabelInput/index';
import Enums from 'utils/EnumsManager';
import {
  fetchFieldValues, addNewValue, sortValues,
  removeValue, deactivateValue,
} from '../flow/actions';
const defaultProps = {
  data: [],
};
const propTypes = {
  data: PropTypes.array.isRequired,
};

class MultiDnDWrapper extends Component {
  constructor(props) {
		super(props);
		this.state = {
			themes: [
        {
          id: 1,
          value: 'default',
        },
        {
          id: 2,
          value: 'lead',
        },
        {
          id: 3,
          value: 'account',
        },
        {
          id: 4,
          value: 'opport',
        },
        {
          id: 5,
          value: 'report',
        },
      ],
      activeTheme: 'default',
		};
  }
  
  componentDidMount() {
    this.props.fetchFieldValues();
  }

  /**
   * unnecessary fucntions, just for display the diff among themes
   */
  onRadioChange = e => {
    const { themes } = this.state;
    const theme = themes.find(theme => theme.id == e.target.value);
    if (theme) {
      this.setState({ activeTheme: theme.value });
    }
  }
  // unnecessary ends

  // dispatch async action to sync the current order with backend
  onDrop = sortedArray => {
    // console.log('dropped ----- current order is:');
    // console.log(sortedArray);
    const ids = sortedArray.map(elem => elem.id);
    this.props.sortValues(ids);
  }  

  handleAdd = value => {
    const { data } = this.props;
    const isDuplicated = data.find(record => record.text === value);
    if (!isDuplicated) {
      this.props.addNewValue({
        id: Date.now(),
        text: value,
        selected: false,
      });
    }
  }

  onIconClick = e => {
    const { id } = e.currentTarget.dataset;
    const { type } = e.target.dataset;
    const { Edit, Delete, Deactivate } = Enums.FieldOperationTypes;
    switch (type) {
      case Delete:
        this.props.removeValue(id);
        return;
      case Deactivate:
        this.props.deactivateValue(id);
        return;
      case Edit:
      default:
        console.log('not found');
        return;
    }
  }

  render() {
    const { data } = this.props;
    const { activeTheme } = this.state;
    return (
      <div>
        <RadioGroup onChange={this.onRadioChange} />
        <br /><br />
        <FloatingLabelInput
          labelText="Add New Value"
          labelColor="#09c"
          placeholder="New value"
          handleSearch={this.handleAdd}
          withSearch
        />
        <br />
        <Container
          data={data}
          theme={activeTheme}
          width={400}
          onDrop={this.onDrop}
          onIconClick={this.onIconClick}
        />
      </div>
    );
  }
}

MultiDnDWrapper.defaultProps = defaultProps;
MultiDnDWrapper.propTypes = propTypes;
const mapStateToProps = ({ global, multiDndFields }) => ({
  language: global.language,
  data: multiDndFields.data,
});
const mapDispatchToProps = {
  fetchFieldValues,
  addNewValue,
  sortValues,
  removeValue,
  deactivateValue,
};
export default connect(mapStateToProps, mapDispatchToProps)(MultiDnDWrapper);