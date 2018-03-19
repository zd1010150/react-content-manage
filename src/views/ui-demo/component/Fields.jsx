import React, { Component } from 'react';
import { CustomField } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
import moment from 'moment';

class FieldsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "data": [
        {
          "id": 1,
          "model_type": "App\\Model\\Lead",
          "field_name": "date",
          "crm_data_type": "date",
          "field_label": "date",
          "notnull": 0,
          "helper_text": null,
          "description": "seeder generated",
          "can_be_mapped": 1,
          "configurable": 1,
          "is_merge_master": 0,
          "precision": 10,
          "scale": 0,
          "length": null,
          "lookup_type": null,
          "lookup_model": null,
          "lookup_relation_name": "",
          "lookup_own_field_name": null
        },
        {
          "id": 2,
          "model_type": "App\\Model\\Lead",
          "field_name": "datetime",
          "crm_data_type": "datetime",
          "field_label": "datetime",
          "notnull": 0,
          "helper_text": null,
          "description": "seeder generated",
          "can_be_mapped": 1,
          "configurable": 0,
          "is_merge_master": 1,
          "precision": 10,
          "scale": 0,
          "length": null,
          "lookup_type": null,
          "lookup_model": null,
          "lookup_relation_name": "",
          "lookup_own_field_name": null
        },
        {
          "id": 3,
          "model_type": "App\\Model\\Lead",
          "field_name": "email",
          "crm_data_type": "email",
          "field_label": "email",
          "notnull": 1,
          "helper_text": null,
          "description": "seeder generated",
          "can_be_mapped": 1,
          "configurable": 1,
          "is_merge_master": 0,
          "precision": 10,
          "scale": 0,
          "length": 191,
          "lookup_type": null,
          "lookup_model": null,
          "lookup_relation_name": "",
          "lookup_own_field_name": null
        },
        {
          "id": 4,
          "model_type": "App\\Model\\Lead",
          "field_name": "longtext",
          "crm_data_type": "longtext",
          "field_label": "longtext",
          "notnull": 1,
          "helper_text": null,
          "description": "seeder generated",
          "can_be_mapped": 1,
          "configurable": 1,
          "is_merge_master": 0,
          "precision": 10,
          "scale": 0,
          "length": 191,
          "lookup_type": null,
          "lookup_model": null,
          "lookup_relation_name": "",
          "lookup_own_field_name": null
        },
        {
          "id": 5,
          "model_type": "App\\Model\\Lead",
          "field_name": "lookup",
          "crm_data_type": "lookup",
          "field_label": "lookup",
          "notnull": 0,
          "helper_text": null,
          "description": "seeder generated",
          "can_be_mapped": 1,
          "configurable": 0,
          "is_merge_master": 1,
          "precision": 10,
          "scale": 0,
          "length": null,
          "lookup_type": "belong",
          "lookup_model": "App\\Model\\User",
          "lookup_relation_name": "created_by_user",
          "lookup_own_field_name": "name"
        },
        {
          "id": 6,
          "model_type": "App\\Model\\LeadCstm",
          "field_name": "number",
          "crm_data_type": "number",
          "field_label": "number",
          "notnull": 0,
          "helper_text": null,
          "description": "seeder generated",
          "can_be_mapped": 1,
          "configurable": 1,
          "is_merge_master": 0,
          "precision": 10,
          "scale": 0,
          "length": null,
          "lookup_type": null,
          "lookup_model": null,
          "lookup_relation_name": "",
          "lookup_own_field_name": null
        },        
        {
          "id": 7,
          "model_type": "App\\Model\\LeadCstm",
          "field_name": "picklist",
          "crm_data_type": "picklist",
          "field_label": "picklist",
          "notnull": 0,
          "helper_text": null,
          "description": "seeder generated",
          "can_be_mapped": 1,
          "configurable": 1,
          "is_merge_master": 0,
          "precision": 10,
          "scale": 0,
          "length": 191,
          "lookup_type": null,
          "lookup_model": null,
          "lookup_relation_name": "",
          "lookup_own_field_name": null,
          "picklists": [
              {
                  "id": 3,
                  "option_value": "US",
                  "option_tip": null,
                  "display_num": 1
              },
              {
                  "id": 2,
                  "option_value": "AU",
                  "option_tip": null,
                  "display_num": 2
              },
              {
                  "id": 1,
                  "option_value": "CN",
                  "option_tip": null,
                  "display_num": 3
              }
          ]
        },
        {
          "id": 20,
          "model_type": "App\\Model\\LeadCstm",
          "field_name": "text",
          "crm_data_type": "text",
          "field_label": "text",
          "notnull": 0,
          "helper_text": null,
          "description": "seeder generated",
          "can_be_mapped": 1,
          "configurable": 1,
          "is_merge_master": 0,
          "precision": 10,
          "scale": 0,
          "length": 191,
          "lookup_type": null,
          "lookup_model": null,
          "lookup_relation_name": "",
          "lookup_own_field_name": null
        },
      ]
    };
  }

  onChange = (id, value) => {
    console.dir('-==--==-');
    console.dir(id);
    console.dir(value);
  }

  render() {
    const { data } = this.state;
    const fields = data.map(record => {
      const value = (record.crm_data_type === 'date' || record.crm_data_type === 'datetime') ? moment() : (record.crm_data_type === 'picklist' ? [] : '');

      let options = null;
      if (record.crm_data_type === 'picklist') {
        options = record.picklists;
      } else if (record.crm_data_type === 'lookup') {
        options = [];
      }
      return <CustomField
                key={record.id}
                id={record.id}
                type={record.crm_data_type}
                label={record.field_label}
                value={value}
                onChange={this.onChange}
                options={options}/>;
    });
    return (
      <div>
        {fields}
      </div>
    );
  }
}

export default FieldsWrapper;