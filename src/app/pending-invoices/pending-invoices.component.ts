import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../shared/_models/document.model';
import { DocumentService } from '../shared/_services/document.service';
import { InvoiceService } from '../shared/_services/invoice.service';
import { NotificationService } from '../shared/_services/notifications.service';

@Component({
  selector: 'app-pending-invoices',
  templateUrl: './pending-invoices.component.html',
  styleUrls: ['./pending-invoices.component.css'],
})
export class PendingInvoicesComponent implements OnInit {
  displayedColumns: string[] = [
    'reciever_name',
    'dateTimeIssued',
    'interanlId',
    'totalAmount',
    'action',
  ];
  dataSource: MatTableDataSource<Document>;
  clickedRows = new Set<Document>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private invoiceService: InvoiceService,
    private documentService: DocumentService,
    private notificationService: NotificationService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator.page.subscribe(res=>{
    //   console.log(res)
    this.invoiceService.getAllInvoices(1, 10).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe((res) => {
      //   //res is an object like
      //   //{length:...,pageIndex:..,pageSize:...,previousPageIndex:..}
      //   console.log(res)
      this.invoiceService
        .getAllInvoices(res.pageIndex, res.pageSize)
        .subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    });
  }

  ngOnChanges() {
    this.paginator.page.subscribe((res) => {
      console.log(res);
      this.invoiceService
        .getAllInvoices(res.pageIndex, res.pageSize)
        .subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    // const dialogRef = this.dialog.open(DialogBoxComponent, {
    //   width: '250px',
    //   data:obj
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result.event == 'Add'){
    //     this.addRowData(result.data);
    //   }else if(result.event == 'Update'){
    //     this.updateRowData(result.data);
    //   }else if(result.event == 'Delete'){
    //     this.deleteRowData(result.data);
    //   }
    // });
  }

  submitInvoice(obj) {
    console.log(obj);
    this.documentService.submitDocument([obj.interanlId]).subscribe((res) => {
      console.log(res);
      this.notificationService.showSuccess('', 'Successfully submitted');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
function DialogBoxComponent(
  DialogBoxComponent: any,
  arg1: { width: string; data: any }
) {
  throw new Error('Function not implemented.');
}
