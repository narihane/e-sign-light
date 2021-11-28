import { non_tax_codes } from 'src/assets/json/NonTaxableTaxTypes';
import { tax_sub_codes } from 'src/assets/json/TaxSubtypes';
import { tax_codes } from 'src/assets/json/TaxTypes';

export class Tax {
  tax = tax_codes; //Only T3 & T6 is amount based and no rate
  sub_tax: SubTaxFields[] = tax_sub_codes;
  non_tax = non_tax_codes; //Non taxable items = rate enabled, amount disabled
  final_tax_arr: TaxFields[] = [];
  constructor() {
    this.tax.forEach((e) => {
      this.final_tax_arr.push(e);
    });
    this.non_tax.forEach((e) => {
      this.final_tax_arr.push(e);
    });
    this.final_tax_arr.forEach((e) => {
      e.sub_tax = this.sub_tax.filter((e1) => e1.TaxtypeReference === e.Code);
    });
    console.log('Tax Object: ', this.final_tax_arr);
  }
}

export interface TaxFields {
  Code: string;
  Desc_en: string;
  Desc_ar: string;
  rate: boolean;
  amount: boolean;
  sub_tax: any[];
  taxable: boolean;
}

export interface SubTaxFields {
  Code: string;
  Desc_en: string;
  Desc_ar: string;
  TaxtypeReference: string;
}
