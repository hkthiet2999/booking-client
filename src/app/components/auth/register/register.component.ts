import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  }, {
    validators: CustomValidators.passwordsMatching
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() { 
    if (this.formRegister.valid) {
      this.authService.register({
        email: this.email.value,
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        password: this.password.value,
        passwordConfirm: this.passwordConfirm.value,
      }).pipe(
        tap(() => this.router.navigate(['../login']))
      ).subscribe();
    }
  }
  
  get email(): FormControl {
    return this.formRegister.get('email') as FormControl;
  }

  get firstname(): FormControl {
    return this.formRegister.get('firstname') as FormControl;
  }

  get lastname(): FormControl {
    return this.formRegister.get('lastname') as FormControl;
  }

  get password(): FormControl {
    return this.formRegister.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.formRegister.get('passwordConfirm') as FormControl;
  }

}
