import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Invoice } from '../_models/invoice.model';
import { AppService } from '../_services/app.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css']
})
export class PrintInvoiceComponent implements OnChanges{
  @Input() inputForm!: Invoice;
  @Output() finishedLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  form!:Invoice;
  valid=false;
  dateNow:string=new Date().toDateString();


  constructor(private appService:AppService) { }

  ngOnChanges(): void {
    console.log(this.form?.fixed?.client_name)
    console.log(this.form)
    this.form=this.inputForm;
    this.dateNow=this.appService.getDateTime();
  }

}
