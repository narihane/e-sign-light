import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceStatus } from '../shared/_models/app.model';


import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentResult } from '../shared/_models/documents.response.model';
import { DocumentService } from '../shared/_services/document.service';

@Component({
  selector: 'app-get-invoices',
  templateUrl: './get-invoices.component.html',
  styleUrls: ['./get-invoices.component.css']
})
export class GetInvoicesComponent implements OnInit {
  displayedColumns: string[] = ['uuid', 'dateTimeIssued', 'status', 'total'];
  dataSource: MatTableDataSource<DocumentResult>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private documentService: DocumentService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }
  status = InvoiceStatus.Approved;

  ngOnInit(): void {
    this.status = this.route.snapshot.queryParams['status'];
    this.documentService.getDocuments(1, 10).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.paginator.page.subscribe(res=>{
    //   //res is an object like
    //   //{length:...,pageIndex:..,pageSize:...,previousPageIndex:..}
    //   console.log(res)
    //   this.documentService.getDocuments(res.pageIndex, res.pageSize).subscribe((data) => {
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   })
    // })
  }

  ngOnChanges(){
    this.paginator.page.subscribe(res=>{
      console.log(res)
      this.documentService.getDocuments(res.pageIndex, res.pageSize).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
