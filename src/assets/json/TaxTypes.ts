import { TaxFields } from 'src/app/shared/_models/tax.model';

export let tax_codes: TaxFields[] = [
  {
    Code: 'T1',
    Desc_en: 'Value added tax',
    Desc_ar: 'ضريبه القيمه المضافه',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T2',
    Desc_en: 'Table tax (percentage)',
    Desc_ar: 'ضريبه الجدول (نسبيه)',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T3',
    Desc_en: 'Table tax (Fixed Amount)',
    Desc_ar: 'ضريبه الجدول (قطعيه)',
    rate: false,
    amount: true,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T4',
    Desc_en: 'Withholding tax (WHT)',
    Desc_ar: 'الخصم تحت حساب الضريبه',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T5',
    Desc_en: 'Stamping tax (percentage)',
    Desc_ar: 'ضريبه الدمغه (نسبيه)',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T6',
    Desc_en: 'Stamping Tax (amount)',
    Desc_ar: 'ضريبه الدمغه (قطعيه بمقدار ثابت )',
    rate: false,
    amount: true,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T7',
    Desc_en: 'Entertainment tax',
    Desc_ar: 'ضريبة الملاهى',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T8',
    Desc_en: 'Resource development fee',
    Desc_ar: 'رسم تنميه الموارد',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T9',
    Desc_en: 'Table tax (percentage)',
    Desc_ar: 'رسم خدمة',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T10',
    Desc_en: 'Municipality Fees',
    Desc_ar: 'رسم المحليات',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T11',
    Desc_en: 'Medical insurance fee',
    Desc_ar: 'رسم التامين الصحى',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
  {
    Code: 'T12',
    Desc_en: 'Other fees',
    Desc_ar: 'رسوم أخري',
    rate: true,
    amount: false,
    sub_tax: [],
    taxable: true,
  },
];