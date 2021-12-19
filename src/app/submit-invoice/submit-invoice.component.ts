import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  Document,
  InvoiceDocument,
  InvoiceLine,
} from '../shared/_models/AE-invoice.model';
import { CodeSearch } from '../shared/_models/codes.models';
import { Invoice, Item, ItemNames } from '../shared/_models/invoice.model';
import { Tax, TaxFields } from '../shared/_models/tax.model';
import { AppService } from '../shared/_services/app.service';
import { CodesService } from '../shared/_services/codes.service';
import { InvoiceService } from '../shared/_services/invoice.service';
import { IssuerService } from '../shared/_services/issuer.service';

export interface ItemTax {
  type: string;
  sub_type: string;
  amount: number;
  rate: number;
}

@Component({
  selector: 'app-submit-invoice',
  templateUrl: './submit-invoice.component.html',
  styleUrls: ['./submit-invoice.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SubmitInvoiceComponent implements OnInit {
  expandedElement!: ItemTax | null;
  //Main form group
  invoiceForm: FormGroup;
  categories: CodeSearch[] = [];
  isSubmitted = false;
  totalPrice = 0;
  totalDiscount = 0;
  invoiceValue!: Invoice;
  hasLoaded: boolean = false;
  receiverType: string = '';
  regNum = '';
  //Display names and call_values for Items
  itemsDisplayNames: ItemNames[] = new Item().itemArr;
  dataSource: MatTableDataSource<any>;
  fixedForm = new FormGroup({
    receiverType: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    totalPrice: new FormControl(0, [Validators.required]),
    netAmount: new FormControl('', [Validators.required]),
    payment_type: new FormControl('', [Validators.required]),
    client_name: new FormControl('', [Validators.required]),
    client_phone: new FormControl('', [Validators.required]),
    client_id: new FormControl('', {
      validators: [ValidateTotalPrice],
      updateOn: 'submit',
    }),
    invoice_id: new FormControl('', [Validators.required]),
    client_email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    total_tax: new FormControl({}, [Validators.required]),
  });
  displayedColumns = [
    'actions',
    'category',
    'quantity',
    'weight',
    'unitType',
    'price',
    'discount',
    'value_diff',
    'total_taxable_fees',
    'tax',
    'description',
    'netTotal',
  ];
  taxItems = new FormGroup({
    type: new FormControl('', [Validators.required]),
    subType: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });
  itemForm = new FormGroup({
    desc: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    unitType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    value_diff: new FormControl('', [Validators.required]),
    total_taxable_fees: new FormControl('', [Validators.required]),
    total_tax: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
    tax: this.fb.array([this.taxItems]),
    netTotal: new FormControl(0, [Validators.required]), //Sales Total - Discount Amount -> Sales Total = Quantity*Amount
  });

  //Tax Variables
  totalTax = 0;
  taxArr = new Tax().final_tax_arr;
  displayColumnTax = ['tax_type', 'amount'];
  dataTax = new MatTableDataSource();

  currentInvoiceLineIdx = 0;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private codeService: CodesService,
    private invoiceService: InvoiceService,
    private issuerService: IssuerService
  ) {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([this.itemForm]),
      fixed: this.fixedForm,
    });
    console.log(this.invoiceForm);
    this.dataSource = new MatTableDataSource(this.items().controls);
    console.log(this.dataSource.data);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.items().controls);
    this.populateCategories();
  }

  populateCategories() {
    this.codeService.getCodes(1, 10).subscribe((data) => {
      this.categories = data;
    });
    console.log(this.categories);
  }

  setCurrentInvoiceIdx(i: number) {
    this.currentInvoiceLineIdx = i;
  }

  items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  newInvoice(): FormGroup {
    return new FormGroup({
      desc: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      unitType: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      value_diff: new FormControl('', [Validators.required]),
      total_taxable_fees: new FormControl('', [Validators.required]),
      total_tax: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      tax: this.fb.array([
        new FormGroup({
          type: new FormControl('', [Validators.required]),
          subType: new FormControl('', [Validators.required]),
          rate: new FormControl('', [Validators.required]),
          amount: new FormControl('', [Validators.required]),
        }),
      ]),
      netTotal: new FormControl('', [Validators.required]), //Sales Total - Discount Amount -> Sales Total = Quantity*Amount
    });
  }

  addItem() {
    this.items().push(this.newInvoice());
    var arr = this.invoiceForm.get('items') as FormArray;
    arr.value.forEach((e: any) => {
      if (e['netTotal'] > 0) this.totalPrice += parseFloat(e['netTotal']);
      console.log(this.totalPrice);
    });

    this.invoiceForm.get('fixed')?.get('totalPrice')?.setValue(this.totalPrice);
    this.dataSource = new MatTableDataSource(
      (this.invoiceForm.get('items') as FormArray).controls
    );
  }

  deleteItem(i: number) {
    this.items().removeAt(i);
    this.dataSource = new MatTableDataSource(this.items().controls);
  }

  //On change of quantity, discount and price -> update net total
  updateNetTotal(i: number) {
    const itemFormValue = this.items().value[i];
    debugger;
    const salesTotal =
      itemFormValue['quantity'] * parseFloat(itemFormValue['price']);
    const discount = ((100 - itemFormValue['discount']) / 100) * salesTotal;
    this.invoiceForm.get(['items', i, 'netTotal'])?.setValue(discount);
    console.log(this.invoiceForm.get(['items', i, 'netTotal']));
  }

  onInvoiceAdd() {
    this.isSubmitted = true;

    this.invoiceForm
      .get('fixed')
      ?.get('date')
      ?.setValue(this.appService.getDateTime());
    if (
      this.invoiceForm.value &&
      this.invoiceForm.get('fixed')?.get('client_id')?.value === '' &&
      parseFloat(this.invoiceForm.get('fixed')?.get('totalPrice')?.value) >=
        50000
    ) {
      console.log('Invalid');
    }

    var invoiceLines: InvoiceLine[] = [];
    this.invoiceForm.get('items')?.value.forEach((element) => {
      console.log('here', element);
      var itemType = '';
      var itemCode = '';
      this.codeService
        .searchCodes(1, 10, element.category)
        .subscribe((data) => {
          itemType = data[0].codeTypeName;
          itemCode = data[0].itemCode;

          invoiceLines.push({
            description: element.desc,
            itemType: itemType,
            itemCode: itemCode,
            unitType: 'EA', //element.unitType,
            quantity: element.quantity,
            itemsDiscount: element.discount,
            unitValue: {
              currencySold: element.currency,
              amountEGP: element.price,
            },
            valueDifference: 0.0,
            totalTaxableFees: 0,
            discount: {
              rate: element.discount,
              amount: (element.discount / 100) * element.price,
            },
            taxableItems: [
              {
                taxType: 'T1',
                amount: 18,
                subType: 'V001',
                rate: 0,
              },
            ],
          });

          this.invoiceValue = this.invoiceForm.value;
          console.log(this.invoiceForm.value);
          this.issuerService.getIssuer().subscribe((data) => {
            this.regNum = data[0].registrationNumber;

            var invoice: Document = {
              issuer: {
                id: this.regNum,
              },
              receiver: {
                name: this.invoiceForm.get('fixed')?.get('client_name')?.value,
                id: this.invoiceForm.get('fixed')?.get('client_id')?.value,
                type:
                  this.invoiceForm.get('fixed')?.get('receiverType')?.value ==
                  'business'
                    ? 'B'
                    : this.invoiceForm.get('fixed')?.get('receiverType')
                        ?.value == 'person'
                    ? 'P'
                    : 'F',
                address: {
                  country: 'EG',
                  governate: 'Egypt',
                  regionCity: 'Mufazat al Ismlyah',
                  street: '580 Clementina Key',
                  buildingNumber: 'Bldg. 0',
                  postalCode: '68030',
                  floor: '1',
                  room: '123',
                  landmark: '7660 Melody Trail',
                  additionalInformation: 'beside Townhall',
                },
              },
              documentType: 'I',
              documentTypeVersion: '0.9',
              dateTimeIssued: new Date(),
              taxpayerActivityCode: '4610',
              invoiceLines: invoiceLines,
            };
            console.log(invoice);
            const inv: InvoiceDocument = {
              documents: [invoice],
            };
            this.invoiceService.saveInvoice(inv).subscribe((data) => {
              console.log(data);
            });
          });
        });
    });
  }

  // Taxes Section
  taxes(i: number): FormArray {
    return this.invoiceForm.get(['items', i, 'tax']) as FormArray;
  }

  newTax(): FormGroup {
    return new FormGroup({
      type: new FormControl('', [Validators.required]),
      subType: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });
  }

  addTax(i: number) {
    console.log(this.invoiceForm);
    this.taxes(i).push(this.newTax());
  }

  getT3Value(idx: number) {
    let t3Amount = 0;
    this.taxes(idx).value.forEach((e: any, i: number) => {
      if (e['type'] == 'T3') {
        t3Amount = parseFloat(e['amount']);
      }
    });
    return t3Amount;
  }

  switchOnTaxes(idx: number, idxTax: number) {
    let t3Amount = this.getT3Value(idx);
    this.taxes(idx).value.forEach((e: any, i: number) => {
      debugger;
      if (i == idxTax) {
        switch (e['type']) {
          case 'T1':
            //Amount = (Amount+Net Total + TotalTaxableFees+Value Diff + Taxable item.Amount)*Rate - > Taxable item.Amount == sum of all items in taxable array, TotalTaxableFees== field a user enters
            e['amount'] =
              (0 +
                this.invoiceForm.get(['items', idx, 'netTotal'])?.value +
                this.integerOfField(idx, 'total_tax') +
                this.integerOfField(idx, 'value_diff') +
                this.integerOfField(idx, 'total_taxable_fees')) *
              (parseFloat(e['rate']) / 100);
            this.invoiceForm
              .get(['items', idx, 'tax'])
              ?.get([i, 'amount'])
              ?.setValue(e['amount']);
            console.log(e['amount']);
            // this.invoiceForm.get(['items', i, 'netTotal'])?.setValue(discount);
            break;
          case 'T2':
            // Amount = (Net total + totalTaxableFees + valueDifference + taxableItems.taxType(T3).Amount) * Rate

            e['amount'] =
              (this.invoiceForm.get(['items', idx, 'netTotal'])?.value +
                this.integerOfField(idx, 'value_diff') +
                this.integerOfField(idx, 'total_taxable_fees') +
                t3Amount) *
              (parseFloat(e['rate']) / 100);
            this.invoiceForm
              .get(['items', idx, 'tax'])
              ?.get([i, 'amount'])
              ?.setValue(e['amount']);
            this.recalculateT1(idx, e['amount']);
            debugger;
            break;
          case 'T3':
            // Fixed Amount = Rate should be zero
            t3Amount = parseFloat(e['amount']);
            this.recalculateT2(idx, t3Amount);
            // this.recalculateT1(idx, e['amount']);
            break;
          case 'T4':
            // Amount = taxableItem(T4).Rate * (Net total - discount)
            this.recalculateT1(idx, e['amount']);
            break;

          //T5 --> T12 amount = rate * invoiceline.netTotal except:

          case 'T6':
            // Fixed Amount = Rate should be zero
            this.recalculateT1(idx, e['amount']);
            break;
          case 'T5':
          case 'T7':
          case 'T8':
          case 'T9':
          case 'T10':
          case 'T11':
          case 'T12':
            // this.invoiceForm
            //   .get(['items', idx, 'total_tax'])
            //   ?.setValue(
            //     this.invoiceForm.get(['items', idx, 'total_tax'])?.value -
            //       (e['amount'] === '' ? 0 : parseFloat(e['amount']))
            //   );
            e['amount'] =
              (parseFloat(e['rate']) / 100) *
              this.invoiceForm.get(['items', idx, 'netTotal'])?.value;

            this.recalculateT1(idx, e['amount']);
            break;
          default:
            break;
        }
        this.invoiceForm
          .get(['items', idx, 'tax'])
          ?.get([i, 'amount'])
          ?.setValue(e['amount']);
      }
    });
  }

  integerOfField(idx: number, formField: string) {
    return this.invoiceForm.get(['items', idx, formField])?.value === '' ||
      this.invoiceForm.get(['items', idx, formField])?.value === undefined
      ? 0
      : parseFloat(this.invoiceForm.get(['items', idx, formField])?.value);
  }

  displaySubTax(idxTax: number, i: number) {
    const taxFormValue = this.taxes(idxTax).value[i];
    if (taxFormValue['type'] == '') {
      return true;
    } else {
      return false;
    }
  }

  displayAmount(idxInvoice: number, i: number) {
    return this.taxArr.filter(
      (e1) => this.taxes(idxInvoice).value[i]['type'] === e1.Code
    )[0]?.amount;
  }

  displayRate(idxInvoice: number, i: number) {
    return this.taxArr.filter(
      (e1) => this.taxes(idxInvoice).value[i]['type'] === e1.Code
    )[0]?.rate;
  }

  subTaxArray(idxInvoice: number, i: number) {
    return this.taxArr.filter(
      (e1) => this.taxes(idxInvoice).value[i]['type'] === e1.Code
    )[0]?.sub_tax;
  }

  calculateTaxAmount(idxInvoice: number, idxTax: number) {
    // const taxAmount = !this.displayAmount(idxInvoice, i) ? (this.taxes(idxInvoice).value[i]['rate'] / 100)
    // this.recalculateT1(idxInvoice);
    this.switchOnTaxes(idxInvoice, idxTax);
  }

  calculateTotalItemTaxes(idxInvoice: number) {
    let taxInvoiceLine = 0;
    this.taxes(idxInvoice).value.forEach((e: any, i: number) => {
      if (e['type'] != 'T1') {
        taxInvoiceLine += parseFloat(e['amount']);
      }
    });
    return taxInvoiceLine;
  }

  recalculateT1(idxInvoice: number, amountTaxItem: any) {
    let totalTaxInvoiceLines = this.calculateTotalItemTaxes(idxInvoice);
    this.invoiceForm
      .get(['items', idxInvoice, 'total_tax'])
      ?.setValue(totalTaxInvoiceLines);
    debugger;
    this.taxes(idxInvoice).value.forEach((e: any, i: number) => {
      if (e['type'] === 'T1') {
        e['amount'] =
          (0 +
            this.invoiceForm.get(['items', idxInvoice, 'netTotal'])?.value +
            this.integerOfField(idxInvoice, 'total_tax') +
            this.integerOfField(idxInvoice, 'value_diff') +
            this.integerOfField(idxInvoice, 'total_taxable_fees')) *
          (parseFloat(e['rate']) / 100);
        this.invoiceForm
          .get(['items', idxInvoice, 'tax'])
          ?.get([i, 'amount'])
          ?.setValue(e['amount']);
      }
    });
    debugger;
  }

  recalculateT2(idxInvoice: number, t3Amount: number) {
    this.taxes(idxInvoice).value.forEach((e: any, i: number) => {
      if (e['type'] == 'T2') {
        debugger;
        e['amount'] =
          (this.invoiceForm.get(['items', idxInvoice, 'netTotal'])?.value +
            this.integerOfField(idxInvoice, 'value_diff') +
            this.integerOfField(idxInvoice, 'total_taxable_fees') +
            t3Amount) *
          (parseFloat(e['rate']) / 100);
        this.invoiceForm
          .get(['items', idxInvoice, 'tax'])
          ?.get([i, 'amount'])
          ?.setValue(e['amount']);
        this.recalculateT1(idxInvoice, e['amount']);
      }
    });
    debugger;
  }

  displayedAmount(idxInvoice: number, idxTax: number) {
    return this.taxes(idxInvoice).value[idxTax]['amount'];
  }

  deleteTax(i: number) {
    this.taxes(i).removeAt(i);
  }

  calculateTotalTax() {
    var arr = this.invoiceForm.get('items') as FormArray;
    // var dict = this.invoiceForm.get('fixed')?.get('total_tax')?.value;
    var dict = {};
    arr.value.forEach((e: any) => {
      if (e['tax'].length > 0) {
        e['tax'].forEach((e1) => {
          if (dict[e1.type]) {
            dict[e1.type] += parseFloat(e1.amount);
          } else {
            dict[e1.type] = parseFloat(e1.amount);
          }
        });
      }
    });
    var arr1: any[] = [];
    for (var key in dict) {
      console.log(key);
      if (dict.hasOwnProperty(key)) {
        arr1.push([key, dict[key]]);
      }
    }
    console.log(arr1);
    this.invoiceForm.get('fixed')?.get('total_tax')?.setValue(dict);
    this.dataTax = new MatTableDataSource(arr1);
    console.log(this.dataTax);
    console.log(this.invoiceForm.get('fixed')?.get('total_tax')?.value);
  }
}

function ValidateTotalPrice(
  control: AbstractControl
): { [key: string]: any } | null {
  console.log(control.get('fixed')?.get('client_id')?.value);
  if (
    control.value &&
    control.get('fixed')?.get('client_id')?.value === '' &&
    parseFloat(control.get('fixed')?.get('totalPrice')?.value) >= 50000
  ) {
    return { clientIDInvalid: true };
  }
  return null;
}

export function creatDateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const clientID = control.get('fixed')?.get('client_id')?.value;

    const totalPrice = control.get('fixed')?.get('totalPrice')?.value;
    if (clientID == '' && parseFloat(totalPrice) >= 50000) {
      return { totalPrice: true };
    }

    return null;
  };
}
