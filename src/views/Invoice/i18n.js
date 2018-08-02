import Enums from 'utils/EnumsManager';

const {
  Description,
  Code,
  Total,
} = Enums.Invoice.ItemsList.Columns;

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
    summaryTableTitle: '发票价格总和',
    table: {
      rowTotal: '货品总价',
      tax: '税',
      grandTotal: '实际总价',
    },
    tips: {
      [Description]: '产品描述',
      [Code]: '产品编号或SKU',
      [Total]: '产品总价 = 数量 * 单价 (自动计算)',
      rowTotal: '商品总价',
      tax: '税价',
      grandTotal: '实际总价',
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
    summaryTableTitle: 'Invoice Totals',
    table: {
      rowTotal: 'Subtotal',
      tax: 'Tax',
      grandTotal: 'Grand Total',
    },
    tips: {
      [Description]: 'Item Description',
      [Code]: 'Item Number or SKU',
      [Total]: 'Total = Quantity * Unit Price, calculated by default',
      rowTotal: 'Subtotal',
      tax: 'Taxable Amount',
      grandTotal: 'Grand Total',
    },
  },
};
