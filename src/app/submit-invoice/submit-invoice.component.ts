import { Component, OnInit } from '@angular/core';
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
import { AppService } from '../shared/_services/app.service';
import { CodesService } from '../shared/_services/codes.service';
import { InvoiceService } from '../shared/_services/invoice.service';
import { IssuerService } from '../shared/_services/issuer.service';

@Component({
  selector: 'app-submit-invoice',
  templateUrl: './submit-invoice.component.html',
  styleUrls: ['./submit-invoice.component.css'],
})
export class SubmitInvoiceComponent implements OnInit {
  //Main form group
  invoiceForm: FormGroup;
  categories: CodeSearch[] = [];
  isSubmitted = false;
  totalPrice = 0;
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
    totalPrice: new FormControl('', [Validators.required]),
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
  });
  displayedColumns = [
    'actions',
    'category',
    'quantity',
    'weight',
    'unitType',
    'price',
    'discount',
    'description',
  ];
  itemForm = new FormGroup({
    desc: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    unitType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
  });

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
    this.codeService.getCodes(1, 10).subscribe((data) => {
      this.categories = data;
    });
    this.dataSource = new MatTableDataSource(this.items().controls);
  }

  items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  newInvoice(): FormGroup {
    return new FormGroup({
      desc: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      unitType: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
    });
  }

  addItem() {
    this.items().push(this.newInvoice());
    var arr = this.invoiceForm.get('items') as FormArray;
    arr.value.forEach((e: any) => {
      if (e['price'] > 0) this.totalPrice += parseInt(e['price']);
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

  onInvoiceAdd() {
    this.isSubmitted = true;

    this.invoiceForm
      .get('fixed')
      ?.get('date')
      ?.setValue(this.appService.getDateTime());
    if (
      this.invoiceForm.value &&
      this.invoiceForm.get('fixed')?.get('client_id')?.value === '' &&
      parseInt(this.invoiceForm.get('fixed')?.get('totalPrice')?.value) >= 50000
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
              rate: 10.0,
              amount: 0,
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
}

function ValidateTotalPrice(
  control: AbstractControl
): { [key: string]: any } | null {
  console.log(control.get('fixed')?.get('client_id')?.value);
  if (
    control.value &&
    control.get('fixed')?.get('client_id')?.value === '' &&
    parseInt(control.get('fixed')?.get('totalPrice')?.value) >= 50000
  ) {
    return { clientIDInvalid: true };
  }
  return null;
}

export function creatDateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const clientID = control.get('fixed')?.get('client_id')?.value;

    const totalPrice = control.get('fixed')?.get('totalPrice')?.value;
    if (clientID == '' && parseInt(totalPrice) >= 50000) {
      return { totalPrice: true };
    }

    return null;
  };
}
