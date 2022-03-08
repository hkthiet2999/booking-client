import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomValidators } from 'app/admin/_helpers/custom-validators';

interface GenderOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @ViewChild('createUser', { static: false }) createUser!: ElementRef;


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
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

   
  }

  register() { 
    console.log('call authService.register');
    // if (this.formRegister.valid) {
    //   this.authService.register({
    //     email: this.email.value,
    //     firstname: this.firstname.value,
    //     lastname: this.lastname.value,
    //     password: this.password.value,
    //     passwordConfirm: this.passwordConfirm.value,
    //   }).pipe(
    //     tap(() => this.router.navigate(['../login']))
    //   ).subscribe();
    // }
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
