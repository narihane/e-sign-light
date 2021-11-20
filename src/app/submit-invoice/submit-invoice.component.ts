import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CodeSearch } from '../shared/_models/codes.models';
import { Invoice, Item, ItemNames } from '../shared/_models/invoice.model';
import { AppService } from '../shared/_services/app.service';
import { CodesService } from '../shared/_services/codes.service';

@Component({
  selector: 'app-submit-invoice',
  templateUrl: './submit-invoice.component.html',
  styleUrls: ['./submit-invoice.component.css']
})
export class SubmitInvoiceComponent implements OnInit {
 //Main form group
 invoiceForm: FormGroup;
 categories:CodeSearch[] = [];
 isSubmitted = false;
 totalPrice = 0;
 invoiceValue!: Invoice;
 hasLoaded:boolean=false;
 receiverType:string='';

 //Display names and call_values for Items
 itemsDisplayNames: ItemNames[] = new Item().itemArr;

 fixedForm = new FormGroup({
   receiverType: new FormControl('', [
    Validators.required
  ]),
   date: new FormControl('', [
     Validators.required
   ]),
   branch: new FormControl('', [
     Validators.required
   ]),
   totalPrice: new FormControl('', [
     Validators.required
   ]),
   payment_type: new FormControl('', [
     Validators.required
   ]),
   client_name: new FormControl('', [
     Validators.required
   ]),
   client_phone: new FormControl('', [
     Validators.required
   ]),
   client_id: new FormControl('', {
     validators: [ValidateTotalPrice],
     updateOn: 'submit'
   }),
   invoice_id: new FormControl('', [
     Validators.required
   ]),
   client_email: new FormControl('', {
     validators: [
       Validators.required,
       Validators.email
     ]
   })
 });

 itemForm = new FormGroup({
   desc: new FormControl('', [
     Validators.required
   ]),
   currency: new FormControl('', [
     Validators.required
   ]),
   quantity: new FormControl('', [
     Validators.required
   ]),
   category: new FormControl('', [
     Validators.required
   ]),
   weight: new FormControl('', [
     Validators.required
   ]),
   price: new FormControl('', [
     Validators.required
   ]),
   discount: new FormControl('', [
     Validators.required
   ])
 });

 constructor(private fb: FormBuilder, private appService:AppService,
  private codeService:CodesService) {
   this.invoiceForm = this.fb.group({
     items: this.fb.array([this.itemForm]),
     fixed: this.fixedForm
   })
 }

 ngOnInit(): void {
   this.codeService.getCodes(1,10).subscribe((data)=>{
     this.categories=data;
   })
 }

 items(): FormArray {
   return this.invoiceForm.get("items") as FormArray
 }

 newInvoice(): FormGroup {
   return new FormGroup({
    desc: new FormControl('', [
      Validators.required
    ]),
    currency: new FormControl('', [
      Validators.required
    ]),
    quantity: new FormControl('', [
      Validators.required
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    weight: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    discount: new FormControl('', [
      Validators.required
    ])
  });
 }

 addItem() {
   this.items().push(this.newInvoice());
   var arr = this.invoiceForm.get("items") as FormArray;
   arr.value.forEach((e: any) => {
     if(e["price"]>0)
      this.totalPrice += parseInt(e["price"]);
    console.log(this.totalPrice)
  });

  this.invoiceForm.get("fixed")?.get("totalPrice")?.setValue(this.totalPrice);
 }

 deleteItem(i: number) {
   this.items().removeAt(i);
 }

 onInvoiceAdd() {
   this.isSubmitted = true;

   this.invoiceForm.get("fixed")?.get("date")?.setValue(this.appService.getDateTime());


   if (this.invoiceForm.value && this.invoiceForm.get("fixed")?.get("client_id")?.value === ''
     && parseInt(this.invoiceForm.get("fixed")?.get("totalPrice")?.value) >= 50000) {
     console.log('Invalid')

   }
   this.invoiceValue = this.invoiceForm.value;
   console.log(this.invoiceForm.value)
 }
}

function ValidateTotalPrice(control: AbstractControl): { [key: string]: any } | null {
 console.log(control.get("fixed")?.get("client_id")?.value)
 if (control.value && control.get("fixed")?.get("client_id")?.value === ''
   && parseInt(control.get("fixed")?.get("totalPrice")?.value) >= 50000) {
   return { 'clientIDInvalid': true };
 }
 return null;
}

export function creatDateRangeValidator(): ValidatorFn {
 return (control: AbstractControl): ValidationErrors | null => {
   const clientID = control.get("fixed")?.get("client_id")?.value;

   const totalPrice = control.get("fixed")?.get("totalPrice")?.value;
   if (clientID == '' && parseInt(totalPrice) >= 50000) {
     return { totalPrice: true };
   }

   return null;
 }
}
