import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

import { environment } from '../../../environments/environment';
import { VALIDATION } from '../../core/constants/validation.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showErrorsIfSubmitted: boolean;
  errors: any;

  constructor(
    @Inject(VALIDATION) private validation,
    private authService: AuthService,
  ) {
  }

  get emailControl(): AbstractControl {
    return this.form.get('email');
  }
  get passwordControl(): AbstractControl {
    return this.form.get('password');
  }

  ngOnInit() {
    this.showErrorsIfSubmitted = false;
    this.setErrors();
    this.form = new FormGroup({
      email: new FormControl(environment.production ? '' : 'stan@email.com', {
        validators: [
          Validators.required,
          Validators.pattern(this.validation.email.pattern),
        ],
      }),
      password: new FormControl(environment.production ? '' : 'St_123456789', {
        validators: [
          Validators.required,
          Validators.minLength(this.validation.password.minlength),
          Validators.pattern(this.validation.password.pattern),
        ],
      }),
    });
  }

  onSubmit() {
    this.showErrorsIfSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    // draft
    this.authService.login(this.form.value);
  }

  setErrors() {
    this.errors = {
      email: [
        {name: 'required', text: 'Email is required'},
        {name: 'pattern', text: 'Email is invalid'},
      ],
      password: [
        {name: 'required', text: 'Password is required'},
        {
          name: 'pattern',
          text: 'Password has to contain at least one capital letter, one lowercase letter, one special character and a number'
        },
        {name: 'minlength', text: `Min length is ${this.validation.password.minlength} symbols`},
      ],
    };
  }
}
