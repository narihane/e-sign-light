import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { country_codes} from '../../assets/json/CountryCodes';
@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  countryCodes=country_codes;
  settingsForm: FormGroup;
  oneBranchForm = new FormGroup({
    branchCode: new FormControl('', [
      Validators.required
    ]),
    branchCountry: new FormControl('', [
      Validators.required
    ]),
    branchGovernate: new FormControl('', [
      Validators.required
    ]),
    branchCity: new FormControl('', [
      Validators.required
    ]),
    branchStreet: new FormControl('', [
      Validators.required
    ]),
    branchBuildingNum: new FormControl('', [
      Validators.required
    ])
  });
  constructor(private fb: FormBuilder) {
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
    console.log(this.countryCodes)
  }

  settingsSubmit(){
    //TODO: Settings submit
  }

  branches(): FormArray {
    return this.settingsForm.get("branches") as FormArray
  }

  newCode(): FormGroup {
    return new FormGroup({
      branchCode: new FormControl('', [
        Validators.required
      ]),
      branchCountry: new FormControl('', [
        Validators.required
      ]),
      branchGovernate: new FormControl('', [
        Validators.required
      ]),
      branchCity: new FormControl('', [
        Validators.required
      ]),
      branchStreet: new FormControl('', [
        Validators.required
      ]),
      branchBuildingNum: new FormControl('', [
        Validators.required
      ])
    });
  }

  addItem() {
    this.branches().push(this.newCode());
  }
}
