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

  constructor(private modalService: NgbModal, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    // private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //Login
  get email() { return this.loginForm.get('email')?.value; }
  get password() { return this.loginForm.get('password')?.value; }



  onLogin(): void {
    this.authenticationService.login(this.email, this.password).subscribe((data) => console.log(data));
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      //TODO:HANDLE ERROR OF INVALID LOGIN
      return;
    }
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
