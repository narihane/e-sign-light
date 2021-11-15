import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceStatus } from '../_models/app.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() title='';
  @Input() status:InvoiceStatus=InvoiceStatus.Pending;
  // TODO: Input data from admin-main
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  onButtonSubmit(){
    console.log("here")
    this.router.navigate(['invoiceDetails'], {
      queryParams:
        { status: this.status}, skipLocationChange: true
    });
  }
}
