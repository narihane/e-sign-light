import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../shared/_services/authentication.service';
import { UserService } from '../shared/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  closeResult = '';
  modalReference: any;
  loading = false;
  returnUrl: string = '';
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });


  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
  }, { validators: this.checkPasswords });

  constructor(private modalService: NgbModal, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    // private userService: UserService
    ) { }

  ngOnInit(): void {
    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //Login
  get email() { return this.loginForm.get('email')?.value; }
  get password() { return this.loginForm.get('password')?.value; }

  //Register
  get name() { return this.registerForm.get('name'); }
  get emailReg() { return this.registerForm.get('email'); }
  get passReg() { return this.registerForm.get('password'); }
  get confirmPass() { return this.registerForm.get('confirmPassword'); }


  onLogin(): void {
    this.authenticationService.login(this.email,this.password).subscribe((data) => console.log(data));
    // API for login access token

    this.router.navigate(['home'], {
      skipLocationChange: true
    });
    this.loginForm.reset();
  }

  // register() {
  //   this.loading = true;
  //   this.userService.create()
  //     .subscribe(
  //       data => {
  //         this.router.navigate(['login']);
  //       },
  //       error => {
  //         this.loading = false;
  //       });
  // }

  /*login() {
    this.loading = true;
    this.authenticationService.login(this.email, this.password)
      .subscribe(
        data => {
          // login successful so redirect to return url
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          // login failed so display error
          this.loading = false;
        });
  }*/

  onAdminLogin(): void {
    this.router.navigate(['adminMain'], {
      queryParams:
        { email: this.email, password: this.password }, skipLocationChange: true
    });
    this.loginForm.reset();
  }

  onRegSubmit(): void {
    // Process checkout data here
    console.log('Register', this.registerForm.value);
    // API post for registering users
    this.modalReference.close();
    this.registerForm.reset();
  }

  open(content: any) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then(() => {
      this.closeResult = `Closed with`;
    }, () => {
      this.closeResult = `Dismissed `;
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
