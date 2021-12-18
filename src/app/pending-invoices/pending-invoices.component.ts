import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Document, Documents } from '../shared/_models/document.model';
import { DocumentService } from '../shared/_services/document.service';
import { InvoiceService } from '../shared/_services/invoice.service';
import { NotificationService } from '../shared/_services/notifications.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { transpileModule } from 'typescript';
import { FormControl, FormGroup } from '@angular/forms';
import { EditInvoiceComponent } from '../shared/edit-invoice/edit-invoice.component';
import { DialogService } from '../shared/_services/dialog.service';

@Component({
  selector: 'app-pending-invoices',
  templateUrl: './pending-invoices.component.html',
  styleUrls: ['./pending-invoices.component.css'],
})
export class PendingInvoicesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'receiver_name',
    'dateTimeIssued',
    'interanlId',
    'totalAmount',
    'action',
  ];
  dataSource: MatTableDataSource<Document>;
  clickedRows = new Set<Document>(); //TODO: ON CLICK SELECT ROW THEN ON ANOTHER CLICK DE-SELECT
  selection = new SelectionModel<Document>(true, []);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  isLoadingResults: boolean = true;
  isRateLimitReached: boolean = false;
  data: Document[] = [];
  resultsLength: any;
  documentModel!: Documents;
  ableToSubmit = true;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private invoiceService: InvoiceService,
    private documentService: DocumentService,
    private notificationService: NotificationService,
    public dialogService: DialogService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const sortDate = this.dataSource.sort?.direction === 'asc' ? 1 : 0;
    this.invoiceService
      .getAllInvoices(0, 5, this.range, sortDate)
      .subscribe((data) => {
        this.documentModel = data;
        this.dataSource = new MatTableDataSource(data.invoices);
        this.isLoadingResults = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadDocumentsPage()))
      .subscribe();
  }

  loadDocumentsPage() {
    this.isLoadingResults = true;
    const sortDate = this.dataSource.sort?.direction === 'asc' ? 1 : 0;
    console.log(this.dataSource.sort?.direction);
    this.invoiceService
      .getAllInvoices(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.range,
        sortDate
      )
      .subscribe((data) => {
        this.documentModel = data;
        this.isLoadingResults = false;
        this.dataSource = new MatTableDataSource(data.invoices);
      });
  }

  ngOnChanges() {}

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

  submitOneInvoice(obj) {
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Document): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.interanlId + 1
    }`;
  }

  submitSelected() {
    console.log(this.selection.selected);
    const selectedIds: string[] = [];
    this.selection.selected.forEach((e) => selectedIds.push(e.interanlId));
    this.documentService.submitDocument(selectedIds).subscribe((res) => {
      console.log(res);
      this.notificationService.showSuccess('', 'Successfully submitted');
    });
  }

  isAnySelected() {
    this.ableToSubmit = true;
  }

  editInvoice(obj) {
    const dialogRef = this.dialog.open(EditInvoiceComponent, {
      data: { row: obj },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.invoiceService.editInvoice(this.dialogService.getDialogData());
      }
    });
  }

  deleteItem(id) {
    this.invoiceService.deleteInvoiceById(id).subscribe((data) => {
      this.loadDocumentsPage();
    });
  }

  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    console.log(this.range.value.start);
    // this.isLoadingResults = true;
    this.loadDocumentsPage();
  }

  resetForm() {
    this.range.reset();
    this.loadDocumentsPage();
  }
}
