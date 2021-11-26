import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyErrorStateMatcher } from '../login/login.component';
import { User } from '../shared/_models/user.model';
import { AuthenticationService } from '../shared/_services/authentication.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  @Input() modalReference: any;
  matcher = new MyErrorStateMatcher();
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirm_password')?.value;
    console.log
    return pass === confirmPass ? null : { notSame: true }
  }
  registerForm = new FormGroup({
    first_name: new FormControl('', [
      Validators.required
    ]),
    last_name: new FormControl('', [
      Validators.required
    ]),
    user_name: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ]),
  }, { validators: this.checkPasswords });

  //Register
  get user_name() { return this.registerForm.get('user_name')?.value; }
  get first_name() { return this.registerForm.get('first_name')?.value; }
  get last_name() { return this.registerForm.get('last_name')?.value; }
  get phone() { return this.registerForm.get('phone')?.value; }
  get email() { return this.registerForm.get('email')?.value; }
  get password() { return this.registerForm.get('password')?.value; }
  get confirmPass() { return this.registerForm.get('confirm_password')?.value; }

  constructor(private modalService: NgbModal,private authenticationService: AuthenticationService) { }
  ngOnInit(){ }

  onRegSubmit(): void {
    // Process checkout data here
    console.log('Register', this.registerForm.value);
    // API post for registering users
    const reg_user:User={
      userName: this.user_name,
      firstName: this.first_name,
      lastName:this.last_name,
      email:this.email,
      password:this.password,
      phone:this.phone,
      userRole:1,
      street:"",
      city:"",
      country:""
    }
    this.authenticationService.registerUser(reg_user);
    this.modalReference.close();
    this.registerForm.reset();
  }

}
