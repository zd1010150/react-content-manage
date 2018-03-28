import { createSelector } from 'reselect';
import _ from 'lodash';

const getCurrentObjectFields = setup => setup.fields.tableView.currentObject;
const getRelativeFields = setup => setup.fields.tableView.relativeFields;
// const getSelectedField = setup => setup.fields.tableView.selectedField;

export const getToFieldsStatus = createSelector(
  [
    getCurrentObjectFields,
    getRelativeFields,
  ],
  (currentFields, relativeFields) => {
    const { to } = relativeFields;
    const result = {};
    const { objType, fields } = currentFields;
    const { mappings } = fields;
    Object.keys(to).forEach((toObjType) => {
      let mappingData = mappings.filter(m => m.from_object_type === objType && m.to_object_type === toObjType); // 过滤出当前的objecttype对应的映射关系
      if (_.isEmpty(mappingData)) mappingData = [{ mapping_data: {} }];
      const allOccupiedFields = Object.keys(mappingData[0].mapping_data); // 当前objecttype映射的objecttypes
      result[toObjType] = to[toObjType].map((f) => {
        const isOccupied = allOccupiedFields.indexOf(`${f.id}`) > -1;
        return Object.assign({}, f, { isOccupied });
      });
    });
    return result;
  },
);

