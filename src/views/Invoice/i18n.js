import Enums from 'utils/EnumsManager';

const { ItemsList, Summary } = Enums.InvoicePage;
const {
  Description,
  Code,
  Total,
} = ItemsList.Columns;
const {
  Columns,
  Rows,
} = Summary;
const {
  SDescription,
  SAddition,
  STotal,
} = Columns;
const {
  Subtotal,
  Tax,
  GrandTotal,
} = Rows;

export default {
  zh: {
    attachment: '附件',
    chooseFile: '选择文件',
    panelTitle: {
      new: 'Add New Invoice',
      edit: 'Edit Invoice',
    },
    sections: {
      ci: '公司地址',
      bi: '寄送地址',
      id: '货物描述',
    },
    titles: {
      summary: '发票总价',
    },
    tips: {
      [Description]: '产品描述',
      [Code]: '产品编号或SKU',
      [Total]: '产品总价 = 数量 * 单价 (自动计算)',
      [STotal]: '由上表中货品总价根据左侧选定的公式自动计算',
    },
    descriptions: {
      [Subtotal]: '所有产品总价',
      [Tax]: '税价',
      [GrandTotal]: '总价',
    },
  },
  en: {
    attachment: 'Attachment',
    chooseFile: 'Choose File',
    panelTitle: {
      new: '添加新发票',
      edit: '编辑发票',
    },
    sections: {
      ci: 'Company Address',
      bi: 'Bill To',
      id: 'Item Description',
    },
    titles: {
      summary: 'Invoice Totals',
    },
    tips: {
      [Description]: 'Item Description',
      [Code]: 'Item Number or SKU',
      [Total]: 'Total = Quantity * Unit Price, calculated by default',
      [STotal]: 'Total is calculated by the above items total price with formulas on the left.',
    },
    descriptions: {
      [Subtotal]: 'Subtotal',
      [Tax]: 'Tax',
      [GrandTotal]: 'Grand Total',
    },
  },
};
