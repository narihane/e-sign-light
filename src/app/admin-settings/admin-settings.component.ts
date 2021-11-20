import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { country_codes } from '../../assets/json/CountryCodes';
import { Issuer } from '../shared/_models/issuer.model';
import { IssuerService } from '../shared/_services/issuer.service';
import { NotificationService } from '../shared/_services/notifications.service';
@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  countryCodes = country_codes;
  settingsForm: FormGroup;
  oneBranchForm = new FormGroup({
    branchID: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
      Validators.required
    ]),
    governate: new FormControl('', [
      Validators.required
    ]),
    regionCity: new FormControl('', [
      Validators.required
    ]),
    street: new FormControl('', [
      Validators.required
    ]),
    buildingNumber: new FormControl('', [
      Validators.required
    ]),
    postalCode: new FormControl('', [
      Validators.required
    ]),
    floor: new FormControl('', [
      Validators.required
    ]),
    room: new FormControl('', [
      Validators.required
    ]),
    landmark: new FormControl('', [
      Validators.required
    ]),
    additionalInformation: new FormControl('', [
      Validators.required
    ]),
  });
  constructor(private fb: FormBuilder, private issuerService: IssuerService,
    private notificationService: NotificationService) {
    this.settingsForm = this.fb.group({
      branches: this.fb.array([this.oneBranchForm]),
      reg_num: new FormControl('', [
        Validators.required
      ]),
      price_threshold: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      type: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
    console.log(this.settingsForm.value)
  }

  settingsSubmit() {
    //TODO: Settings submit
    const issuer: Issuer = {
      type: this.settingsForm.get('type')?.value,
      name: this.settingsForm.get('name')?.value,
      registrationNumber: this.settingsForm.get('reg_num')?.value,
      priceThreshold: this.settingsForm.get('price_threshold')?.value,
      addresses: this.settingsForm.get('branches')?.value,
    }
    this.issuerService.createIssuer(issuer).subscribe((data)=>{

    });
  }

  branches(): FormArray {
    return this.settingsForm.get("branches") as FormArray
  }

  newCode(): FormGroup {
    return new FormGroup({
      branchID: new FormControl('', [
        Validators.required
      ]),
      country: new FormControl('', [
        Validators.required
      ]),
      governate: new FormControl('', [
        Validators.required
      ]),
      regionCity: new FormControl('', [
        Validators.required
      ]),
      street: new FormControl('', [
        Validators.required
      ]),
      buildingNumber: new FormControl('', [
        Validators.required
      ]),
      postalCode: new FormControl('', [
        Validators.required
      ]),
      floor: new FormControl('', [
        Validators.required
      ]),
      room: new FormControl('', [
        Validators.required
      ]),
      landmark: new FormControl('', [
        Validators.required
      ]),
      additionalInformation: new FormControl('', [
        Validators.required
      ])
    })
  }

  addItem() {
    this.branches().push(this.newCode());
  }
}
