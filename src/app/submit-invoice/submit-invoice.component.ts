import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Invoice, Item, ItemNames } from '../shared/_models/invoice.model';
import { AppService } from '../shared/_services/app.service';

@Component({
  selector: 'app-submit-invoice',
  templateUrl: './submit-invoice.component.html',
  styleUrls: ['./submit-invoice.component.css']
})
export class SubmitInvoiceComponent implements OnInit {
 //Main form group
 invoiceForm: FormGroup;
 categories = ['Gold Pendant', 'Gold necklace'];
 isSubmitted = false;
 totalPrice = 0;
 invoiceValue!: Invoice;
 hasLoaded:boolean=false;

 //Display names and call_values for Items
 itemsDisplayNames: ItemNames[] = new Item().itemArr;

 fixedForm = new FormGroup({
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
   model: new FormControl('', [
     Validators.required
   ]),
   serial_number: new FormControl('', [
     Validators.required
   ]),
   quantity: new FormControl('', [
     Validators.required
   ]),
   karat: new FormControl('', [
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
   ])
 });

 constructor(private fb: FormBuilder, private appService:AppService) {
   this.invoiceForm = this.fb.group({
     items: this.fb.array([this.itemForm]),
     fixed: this.fixedForm
   })
 }

 ngOnInit(): void {
 }

 items(): FormArray {
   return this.invoiceForm.get("items") as FormArray
 }

 newInvoice(): FormGroup {
   return new FormGroup({
     model: new FormControl('', [
       Validators.required
     ]),
     serial_number: new FormControl('', [
       Validators.required
     ]),
     quantity: new FormControl('', [
       Validators.required
     ]),
     karat: new FormControl('', [
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
     ])
   });
 }

 addItem() {
   this.items().push(this.newInvoice());
 }

 deleteItem(i: number) {
   this.items().removeAt(i);
 }

 onInvoiceAdd() {
   this.isSubmitted = true;

   this.invoiceForm.get("fixed")?.get("date")?.setValue(this.appService.getDateTime());
   var arr = this.invoiceForm.get("items") as FormArray;
   console.log(arr.value)

   arr.value.forEach((e: any) => {
     this.totalPrice += parseInt(e["price"]);
   });

   this.invoiceForm.get("fixed")?.get("totalPrice")?.setValue(this.totalPrice);
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
