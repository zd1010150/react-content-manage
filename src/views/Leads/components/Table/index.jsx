import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

const defaultProps = {

};
const propTypes = {
  intl: intlShape.isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  onSelectChange: PropTypes.func.isRequired,
};

class TableWrapper extends Component {
  state = {
    data: [],
    pagination: {},
  }

  renderColumns = (data) => {
    const example = [
      {
        "id": 1,
        "model_type": "App\\Model\\Lead",
        "field_name": "created_by_user_id",
        "crm_data_type": "number",
        "field_label": "created_by_user_id",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 0,
        "is_merge_master": 1,
        "precision": 10,
        "scale": 0,
        "length": null
      },
      {
        "id": 2,
        "model_type": "App\\Model\\Lead",
        "field_name": "ownership_id",
        "crm_data_type": "number",
        "field_label": "ownership_id",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 0,
        "is_merge_master": 1,
        "precision": 10,
        "scale": 0,
        "length": null
      },
      {
        "id": 3,
        "model_type": "App\\Model\\Lead",
        "field_name": "name",
        "crm_data_type": "text",
        "field_label": "name",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 4,
        "model_type": "App\\Model\\Lead",
        "field_name": "first_name",
        "crm_data_type": "text",
        "field_label": "first_name",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 5,
        "model_type": "App\\Model\\Lead",
        "field_name": "last_name",
        "crm_data_type": "text",
        "field_label": "last_name",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 6,
        "model_type": "App\\Model\\Lead",
        "field_name": "lead_type",
        "crm_data_type": "text",
        "field_label": "lead_type",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 7,
        "model_type": "App\\Model\\Lead",
        "field_name": "lead_status",
        "crm_data_type": "text",
        "field_label": "lead_status",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 8,
        "model_type": "App\\Model\\Lead",
        "field_name": "phone",
        "crm_data_type": "text",
        "field_label": "phone",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 9,
        "model_type": "App\\Model\\Lead",
        "field_name": "email",
        "crm_data_type": "text",
        "field_label": "email",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 10,
        "model_type": "App\\Model\\Lead",
        "field_name": "address",
        "crm_data_type": "text",
        "field_label": "address",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 11,
        "model_type": "App\\Model\\Lead",
        "field_name": "state",
        "crm_data_type": "text",
        "field_label": "state",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 12,
        "model_type": "App\\Model\\Lead",
        "field_name": "country_code",
        "crm_data_type": "text",
        "field_label": "country_code",
        "notnull": 1,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 2
      },
      {
        "id": 13,
        "model_type": "App\\Model\\Lead",
        "field_name": "company_name",
        "crm_data_type": "text",
        "field_label": "company_name",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 14,
        "model_type": "App\\Model\\Lead",
        "field_name": "company_type",
        "crm_data_type": "text",
        "field_label": "company_type",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 15,
        "model_type": "App\\Model\\Lead",
        "field_name": "company_phone",
        "crm_data_type": "text",
        "field_label": "company_phone",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 16,
        "model_type": "App\\Model\\Lead",
        "field_name": "company_address",
        "crm_data_type": "text",
        "field_label": "company_address",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 17,
        "model_type": "App\\Model\\Lead",
        "field_name": "business_registration_number",
        "crm_data_type": "text",
        "field_label": "business_registration_number",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 18,
        "model_type": "App\\Model\\Lead",
        "field_name": "date_of_incorporation",
        "crm_data_type": "date",
        "field_label": "date_of_incorporation",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": null
      },
      {
        "id": 19,
        "model_type": "App\\Model\\Lead",
        "field_name": "description",
        "crm_data_type": "text",
        "field_label": "description",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": null
      },
      {
        "id": 20,
        "model_type": "App\\Model\\Lead",
        "field_name": "created_at",
        "crm_data_type": "datetime",
        "field_label": "created_at",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 0,
        "is_merge_master": 1,
        "precision": 10,
        "scale": 0,
        "length": null
      },
      {
        "id": 21,
        "model_type": "App\\Model\\Lead",
        "field_name": "updated_at",
        "crm_data_type": "datetime",
        "field_label": "updated_at",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 0,
        "is_merge_master": 1,
        "precision": 10,
        "scale": 0,
        "length": null
      },
      {
        "id": 22,
        "model_type": "App\\Model\\Lead",
        "field_name": "deleted_at",
        "crm_data_type": "datetime",
        "field_label": "deleted_at",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 0,
        "is_merge_master": 1,
        "precision": 10,
        "scale": 0,
        "length": null
      },
      {
        "id": 23,
        "model_type": "App\\Model\\LeadCstm",
        "field_name": "c__a1",
        "crm_data_type": "picklist",
        "field_label": "c__a1",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191,
        "picklist": {
          "data": [
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
        }
      },
      {
        "id": 24,
        "model_type": "App\\Model\\LeadCstm",
        "field_name": "c__a2",
        "crm_data_type": "text",
        "field_label": "c__a2",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": 191
      },
      {
        "id": 25,
        "model_type": "App\\Model\\LeadCstm",
        "field_name": "c__a3",
        "crm_data_type": "number",
        "field_label": "c__a3",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": null
      },
      {
        "id": 26,
        "model_type": "App\\Model\\LeadCstm",
        "field_name": "c__a4",
        "crm_data_type": "datetime",
        "field_label": "c__a4",
        "notnull": 0,
        "helper_text": null,
        "description": "seeder generated",
        "can_be_mapped": 1,
        "configurable": 1,
        "is_merge_master": 0,
        "precision": 10,
        "scale": 0,
        "length": null
      }
    ];
    const columns = example.map(column => {
      return {
        title: column.field_label,
        dataIndex: column.field_name,
      }
    });
    //test

    // return [{
    //   title: 'Name',
    //   dataIndex: 'name',
    //   key: 'name',
    // }, {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // }, {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // }];
  }

  render() {
    const columns = this.renderColumns();

    const { selectedIds, onSelectChange } = this.props;
    const rowSelection = {
      selectedRowKeys: selectedIds,
      onChange: onSelectChange
    }

    //test
    const dataSource = [{
      id: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    }, {
      id: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }, {
      id: '3',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }];
    //test ends
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        pagination={{
          size: 'small',
          className: 'stickToRight'
        }}
        size="small"
        rowKey={record => record.id}
      />
    );
  }
}

TableWrapper.defaultProps = defaultProps;
TableWrapper.propTypes = propTypes;
export default injectIntl(TableWrapper);