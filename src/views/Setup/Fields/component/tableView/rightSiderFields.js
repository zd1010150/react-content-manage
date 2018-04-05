/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { Checkbox, Col, Row } from 'antd';
import PropTypes from 'prop-types';


const RightSiderFields = ({
  fromField, fromObjectType, toObjectType, fields, onChange, allFields, fieldCategory,
}) => {
  const from = _.isEmpty(allFields[fieldCategory]) ? { map_to: [] } : allFields[fieldCategory].filter(f => f.id === fromField.id)[0];
  const mappedFields = _.isEmpty(toObjectType) || _.isEmpty(from.map_to[toObjectType]) ? [] : from.map_to[toObjectType];
  const mappedFieldsId = mappedFields.map(f => f.id);

  const getCheckoutStatus = field => ({
    checked: field.isOccupied,
    disabled: field.isOccupied && mappedFieldsId.indexOf(field.id) < 0,
  });
  return (
    <div className="pt-lg pl-lg">
      <h2>map <span className="error-msg">{ fromField.field_label }</span> to {toObjectType} </h2>
      {
            fields.map(f =>
              (<Row key={f.id} className="pt-lg pr-lg pb-sm">
                <Col span={24}>
                  <Checkbox
                    value={f.id}
                    {...getCheckoutStatus(f)}
                    onChange={e => onChange({
                          checked: e.target.checked,
                          fromField,
                          toField: f,
                          toObject: toObjectType,
                          fromObject: fromObjectType,
                      })}
                  >{f.field_label}
                  </Checkbox>
                </Col>
              </Row>
          ))
        }
    </div>
  );
};

RightSiderFields.propTypes = {
  fromField: PropTypes.object.isRequired,
  allFields: PropTypes.object.isRequired,
  fieldCategory: PropTypes.string.isRequired,
  fromObjectType: PropTypes.string.isRequired,
  toObjectType: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RightSiderFields;

