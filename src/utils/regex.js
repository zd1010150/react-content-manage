export const phoneReg = /\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
export const zipCodeReg = /\d{4,6}/;
export const domainReg = /^https?:\/\/[\w-.]+(:\d+)?/i;
export const idNumberReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
export const positiveFloat = /^(0|([1-9][0-9]*))(\.?)\d{0,2}$/;
export const passwordReg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
