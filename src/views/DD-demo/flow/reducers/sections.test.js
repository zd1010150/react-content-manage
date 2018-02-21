var _ = require('lodash');
const labelToCode = label => label.replace(/\s/g, '') + Math.floor(Math.random() * 1000);
const defaultFields = [{
    id: 'name',
    is_layout_required: true,
    label: 'Name',
    type: 'text',
    position: [0, 0],
}, {
    id: 'email',
    is_layout_required: false,
    label: 'Email',
    type: 'text',
    position: [1, 0],
}, {
    id: 'account_type',
    is_layout_required: false,
    label: 'Account Type',
    type: 'select',
    position: [2, 0],
}];
const allFields = [{
    id: 'name',
    is_layout_required: true,
    label: 'Name',
    type: 'text',
}, {
    id: 'email',
    is_layout_required: false,
    label: 'Email',
    type: 'text',
}, {
    id: 'account_type',
    is_layout_required: false,
    label: 'Account Type',
    type: 'select',
}, {
    id: 'language',
    is_layout_required: true,
    label: 'Language',
    type: 'select',
}, {
    id: 'os_type',
    is_layout_required: false,
    label: 'OS Type',
    type: 'text',
}, {
    id: 'region',
    is_layout_required: false,
    label: 'Region',
    type: 'text',
}, {
    id: 'zip',
    is_layout_required: false,
    label: 'Zip',
    type: 'text',
}, {
    id: 'zip2',
    is_layout_required: false,
    label: 'Zip2',
    type: 'text',
},  {
    id: 'zip3',
    is_layout_required: false,
    label: 'Zip3',
    type: 'text',
},  {
    id: 'zip4',
    is_layout_required: false,
    label: 'Zip4',
    type: 'text',
},   {
    id: 'zip5',
    is_layout_required: false,
    label: 'Zip5',
    type: 'text',
},   {
    id: 'zip6',
    is_layout_required: false,
    label: 'Zip6',
    type: 'text',
},   {
    id: 'zip7',
    is_layout_required: false,
    label: 'Zip7',
    type: 'text',
},  {
    id: 'gender',
    is_layout_required: false,
    label: 'Gender',
    type: 'text',
}, {
    id: 'address',
    is_layout_required: false,
    label: 'Address',
    type: 'text',
}, {
    id: 'school',
    is_layout_required: false,
    label: 'School',
    type: 'text',
}, {
    id: 'hobbies',
    is_layout_required: false,
    label: 'Hobbies',
    type: 'text',
}, {
    id: 'company_name',
    is_layout_required: false,
    label: 'Company Name',
    type: 'text',
}, {
    id: 'language2',
    is_layout_required: false,
    label: 'language2',
    type: 'select',
}, {
        id: 'language3',
        is_layout_required: false,
        label: 'language3',
        type: 'select',
    }, {
    id: 'language4',
    is_layout_required: false,
    label: 'language4',
    type: 'select',
}];
const allSections = [{
    code: 'default',
    sequence: 0,
    cols: 1,
    rows: 3,
    label: 'Default Section',
    fields: defaultFields,
}, {
    code: 'section_detail',
    sequence: 1,
    cols: 2,
    rows: 1,
    label: 'Detail More',
    fields: [{
        id: 'region',
        is_layout_required: false,
        label: 'Region',
        type: 'text',
        position: [0, 1],
    }, {
        id: 'language',
        is_layout_required: true,
        label: 'Language',
        type: 'select',
        position: [0, 0],
    }, {
        id: 'language2',
        is_layout_required: false,
        label: 'Language2',
        type: 'select',
        position: [1, 1],
    }, {
        id: 'language3',
        is_layout_required: false,
        label: 'Language3',
        type: 'select',
        position: [2, 0],
    }, {
        id: 'language4',
        is_layout_required: false,
        label: 'Language4',
        type: 'select',
        position: [1, 0],
    }],
}, {
    code: 'section_detail2',
    sequence: 5,
    cols: 2,
    rows: 1,
    label: 'Detail More2',
    fields: [{
        id: 'zip',
        is_layout_required: false,
        label: 'zip',
        type: 'text',
        position: [0, 0],
    }],
}, {
    code: 'section_detail3',
    sequence: 4,
    cols: 2,
    rows: 1,
    label: 'Detail More3',
    fields: [{
        id: 'zip',
        is_layout_required: false,
        label: 'zip',
        type: 'text',
        position: [0, 0],
    }],
}, {
    code: 'section_detail4',
    sequence:3,
    cols: 2,
    rows: 1,
    label: 'Detail More4',
    fields: [{
        id: 'zip3',
        is_layout_required: false,
        label: 'zip3',
        type: 'text',
        position: [0, 0],
    }],
}, {
    code: 'section_detail5',
    sequence: 2,
    cols: 2,
    rows: 1,
    label: 'Detail More5',
    fields: [{
        id: 'zip4',
        is_layout_required: false,
        label: 'zip4',
        type: 'text',
        position: [0, 0],
    }],
}];

const initFilels = (fields, sections) => {
    const allSelectedFileds = [];
    sections.reduce((accumulator, item) => {
        accumulator.push(...item.fields)
        return accumulator;
    }, allSelectedFileds);

    return fields.map(item => Object.assign({}, item, {
        isSelected: _.find(allSelectedFileds, { code: item.code }),
    }));
};
const tt = initFilels(allFields, allSections);
console.log("%o", tt);

const initSection = (sections) => {
    const sortedSection = _.sortBy(sections, ['sequence']);
    const newSortedSection =  sortedSection.map(section => {
        const newFields = _.groupBy(section.fields.map(
            f => {
                const newF = Object.assign({}, f, { x: f.position[0], y: f.position[1] });
                return newF;
            }), 'y');
        const sortedNewFields = {};
        _.forEach(newFields, (value, key) => {
            sortedNewFields[key] = _.sortBy(value, 'x');
        })
       const newSection = Object.assign({}, section, { fields: sortedNewFields });
       return newSection;
    });

    return newSortedSection;
};

let sections = initSection(allSections)

const insertFields = (fields, sourceField, position) => {
    let [x, y] = position;

    let newTargetColumnFields = [];
    const targetColumnFields = fields[y];
    const columnLenght = targetColumnFields.length;
    x = x >columnLenght ? columnLenght : x; //修正插入的位置
    if (x === columnLenght) {
        newTargetColumnFields = targetColumnFields.slice();
        newTargetColumnFields.push(Object.assign({}, sourceField, { x: columnLenght, y }));
    } else if (x >= 0 && x < columnLenght) {
        newTargetColumnFields = targetColumnFields.slice(0, x);
        for (let i = x; i < columnLenght; i++) {
            newTargetColumnFields[i + 1] = Object.assign({}, targetColumnFields[i], {
                x: i + 1,
                y,
            });
        }
        newTargetColumnFields[x] = Object.assign({}, sourceField, { x, y });
    }

    return Object.assign({}, fields, { [y]: newTargetColumnFields });
};
/**
 * add field to the section
 * @param state
 * @param sections
 * @param fieldCode
 * @param sectionCode
 * @param position
 */
const addFieldToSection = (state, {
    allFields, fieldId, sectionCode, position,
}) => {
    const section = state.filter(item => item.code === sectionCode)[0];
    const field = allFields.filter(item => item.id === fieldId)[0];
    const newFields = insertFields(section.fields, field, position);
    const newSection = Object.assign({}, section, { fields: newFields });
    return state.map((item) => {
        if (item.code === sectionCode) {
            return newSection;
        } return item;
    });
};

sections = addFieldToSection(sections, { allFields: allFields, fieldId: 'hobbies', sectionCode: 'default', position: [4,0 ]  });


const deleteFields = (fields, fieldId) => {
    let y,
        x,
        f,
        colFields,
        flag = false,
        newTargetColumnFields = [];
    for (const col in fields) {
        if (flag) break;
        colFields = fields[col];
        for (let i = 0; i < colFields.length; i++) {
            f = colFields[i];
            if (f.id === fieldId) {
                y = col;
                x = i;
                flag = true;
                break;
            }
        }
    }
    const targetColumn = fields[y];
    const targetColumnLength = targetColumn.length;
    if (x > 0) {
        newTargetColumnFields = targetColumn.slice(0, x);
    }
    for (let j = x + 1; j < targetColumnLength; j++) {
        newTargetColumnFields[j - 1] = Object.assign({}, targetColumn[j], { x: j - 1, y });
    }
    return Object.assign({}, fields, { [y]: newTargetColumnFields });
};
const deleteFieldFromSection = (state, {
    allFields, fieldId, sectionCode,
}) => {
    const section = state.filter(item => item.code === sectionCode)[0];
    const newFields = deleteFields(section.fields, fieldId);
    const newSection = Object.assign({}, section, { fields: newFields });
    return state.map((item) => {
        if (item.code === sectionCode) {
            return newSection;
        } return item;
    });
};

// sections = deleteFieldFromSection(sections, { allFields, fieldId: 'language', sectionCode: 'section_detail' })



const moveField = (state, {
    fieldId, allFields, sourceSectionCode, targetSectionCode, position,
}) => {
    const deletedSection = deleteFieldFromSection(state, { fieldId, sectionCode: sourceSectionCode });
    return addFieldToSection(deletedSection, {
        fieldId, allFields, sectionCode: targetSectionCode, position,
    });
};

sections = moveField(sections, {fieldId: 'language', allFields, sourceSectionCode: 'section_detail', targetSectionCode: 'default', position: [1,0]});

const moveSection = (state, {
    sourceSectionCode, sequence,
}) => {
    const newState = state.slice();
    const sourceSection = _.find(state, { code: sourceSectionCode });
    const sourceSequence = sourceSection.sequence;
    if (sourceSection && sequence !== sourceSequence) {
        if (sequence > sourceSequence) {
            for (let i = sourceSequence; i < sequence; i++) {
                newState[i] = Object.assign({}, state[i + 1], { sequence: i });
            }
        } else {
            for (let i = sequence; i < sourceSequence; i++) {
                newState[i + 1] = Object.assign({}, state[i], { sequence: i + 1 });
            }
        }
        newState[sequence] = Object.assign({}, sourceSection, { sequence });
        return newState;
    } else {
        return state;
    }
};

sections = moveSection(sections, {sourceSectionCode: 'section_detail3', sequence: 1})

const sectionCode = labelToCode('test new');
const addSection = (state, { label, sequence }) => {

    const newSection = {
        code: sectionCode,
        sequence: state.length,
        cols: 0,
        rows: 0,
        label,
        fields: {},
    };
    const newState = state.slice();
    newState.push(newSection);
    return moveSection(newState, { sourceSectionCode: sectionCode, sequence });
};
const deleteSection = (state, sectionCode) => {
    const newState = moveSection(state, { sourceSectionCode: sectionCode, sequence: state.length - 1 });
    return newState.slice(0, state.length - 1);
};

sections = addSection(sections, {label: 'test_new', sequence: 1});
sections = deleteSection(sections, sectionCode);
console.log("%o", sections);
