/* Wei Chen  4.29 */
import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import {MustMatch} from './mustMatch.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

@Injectable()
export class SignupComponent implements OnInit {
  private registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private userHttpService: AuthenticationService,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

    // this.http.post('/register', this.registerForm.value)
    //   .subscribe((response) => {
    //     console.log('response ', response);
    //   });

    /* call restful API */
    this.userHttpService.register(
      this.f().username.value,
      this.f().password.value,
      this.f().email.value,
      this.f().firstname.value,
      this.f().lastname.value).pipe(first()).subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
      },
      error => {
          console.log(error);
          this.alertService.error(error);
      });
  }
}


// import { Component, OnInit } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//
// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent implements OnInit {
//   private userForm: FormGroup;
//
//   constructor(private formBuilder: FormBuilder, ) { }
//
//   ngOnInit() {
//     this.userForm = this.formBuilder.group({
//       firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
//       lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
//       email: ['', [Validators.required, Validators.email]],
//       password: [''],
//     });
//   }
//
//   onSubmit() {
//       if (this.userForm.valid) {
//         alert('User form is valid!!');
//         console.log('reactiveForm' , this.userForm.value);
//       } else {
//         alert('User form is not valid!!');
//       }
//   }
// }
