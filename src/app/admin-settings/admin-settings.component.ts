import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { country_codes } from '../../assets/json/CountryCodes';
import { Issuer } from '../shared/_models/issuer.model';
import { User } from '../shared/_models/user.model';
import { IssuerService } from '../shared/_services/issuer.service';
import { NotificationService } from '../shared/_services/notifications.service';
@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css'],
})
export class AdminSettingsComponent implements OnInit {
  displayColumns = [
    'select',
    'userName',
    'firstName',
    'lastName',
    'email',
    'phone',
  ];
  dataSourceUsers: MatTableDataSource<User>;
  clickedRows = new Set<User>(); //TODO: ON CLICK SELECT ROW THEN ON ANOTHER CLICK DE-SELECT
  selection = new SelectionModel<User>(true, []);
  countryCodes = country_codes;
  settingsForm: FormGroup;
  oneBranchForm = new FormGroup({
    branchID: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    governate: new FormControl('', [Validators.required]),
    regionCity: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    buildingNumber: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required]),
    room: new FormControl('', [Validators.required]),
    landmark: new FormControl('', [Validators.required]),
    additionalInformation: new FormControl('', [Validators.required]),
  });
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(
    private fb: FormBuilder,
    private issuerService: IssuerService,
    private notificationService: NotificationService
  ) {
    this.settingsForm = this.fb.group({
      branches: this.fb.array([this.oneBranchForm]),
      reg_num: new FormControl('', [Validators.required]),
      price_threshold: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
    this.dataSourceUsers = new MatTableDataSource();
    this.dataSourceUsers.paginator = this.paginator;
    this.dataSourceUsers.sort = this.sort;
  }

  ngOnInit(): void {
    console.log(this.settingsForm.value);
  }

  settingsSubmit() {
    //TODO: Settings submit
    const issuer: Issuer = {
      type: this.settingsForm.get('type')?.value,
      name: this.settingsForm.get('name')?.value,
      registrationNumber: this.settingsForm.get('reg_num')?.value,
      priceThreshold: this.settingsForm.get('price_threshold')?.value,
      addresses: this.settingsForm.get('branches')?.value,
    };
    this.issuerService.createIssuer(issuer).subscribe((data) => {});
  }

  branches(): FormArray {
    return this.settingsForm.get('branches') as FormArray;
  }

  newCode(): FormGroup {
    return new FormGroup({
      branchID: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      governate: new FormControl('', [Validators.required]),
      regionCity: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      buildingNumber: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
      landmark: new FormControl('', [Validators.required]),
      additionalInformation: new FormControl('', [Validators.required]),
    });
  }

  addItem() {
    this.branches().push(this.newCode());
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceUsers.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSourceUsers.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  rejectUser(obj) {}

  acceptUser(obj) {}
}
