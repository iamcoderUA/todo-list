import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

import { environment } from '../../../environments/environment';
import { VALIDATION } from '../../core/constants/validation.const';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  showErrorsIfSubmitted: boolean;
  isBusy = false; // TODO: remove after NGXS
  errors: any;

  constructor(
    @Inject(VALIDATION) public validation,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.showErrorsIfSubmitted = false;
    this.setErrors();
    this.form = new FormGroup({
      fullName: new FormControl(environment.production ? '' : 'Test', {
        validators: [
          Validators.required,
          Validators.minLength(this.validation.fullName.minlength),
          Validators.maxLength(this.validation.fullName.maxlength),
        ],
        updateOn: 'blur',
      }),
      email: new FormControl(environment.production ? '' : 'test@mail.com', {
        validators: [
          Validators.required,
          Validators.pattern(this.validation.email.pattern),
        ],
        updateOn: 'blur',
      }),
      password: new FormControl(environment.production ? '' : 'Test_123', {
        validators: [
          Validators.required,
          Validators.minLength(this.validation.password.minlength),
          Validators.pattern(this.validation.password.pattern),
        ],
        updateOn: 'blur',
      }),
      confirmPassword: new FormControl(environment.production ? '' : 'Test_123', {
        validators: [
          Validators.required,
          Validators.minLength(this.validation.password.minlength),
          Validators.pattern(this.validation.password.pattern),
        ],
        updateOn: 'blur',
      }),
    }, this.validateEqualPassword);
  }

  get fullNameControl(): AbstractControl {
    return this.form.get('fullName');
  }
  get emailControl(): AbstractControl {
    return this.form.get('email');
  }
  get passwordControl(): AbstractControl {
    return this.form.get('password');
  }
  get confirmPasswordControl(): AbstractControl {
    return this.form.get('confirmPassword');
  }

  validateEqualPassword(control: FormGroup) {
    const {value: {password, confirmPassword}} = control;
    if (password !== confirmPassword) {
      control.controls['confirmPassword'].setErrors({
        ...control.controls['confirmPassword'].errors,
        notEqual: true,
      });
    }
    return null;
  }

  onSubmit() {
    this.showErrorsIfSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    // draft
    this.authService.signUp(this.form.value);
  }

  setErrors() {
    this.errors = {
      password: [
        {name: 'required', text: 'Password is required'},
        {
          name: 'pattern',
          text: 'Password has to contain at least one capital letter, one lowercase letter, one special character and a number',
        },
        {name: 'minlength', text: `Min length is ${this.validation.password.minlength} symbols`},
      ],
      confirmPassword: [
        {name: 'required', text: 'Password confirmation is required'},
        {
          name: 'minlength',
          text: `Min length is ${this.validation.password.minlength} symbols`,
        },
        {name: 'notEqual', text: 'Passwords are not equal'},
      ],
      email: [
        {name: 'required', text: 'Email is required'},
        {name: 'pattern', text: 'Email is invalid'},
      ],
      fullName: [
        {name: 'required', text: 'Full name is required'},
        {name: 'minlength', text: `Min length is ${this.validation.fullName.minlength} symbols`},
        {name: 'maxlength', text: `Max length is ${this.validation.fullName.maxlength} symbols`},
      ],
    };
  }
}
