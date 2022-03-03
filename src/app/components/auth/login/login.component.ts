import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.formLogin.valid) {
      const email = this.email.value;
      const password = this.password.value;
      this.authService.login(email, password).pipe(
        tap(() => this.router.navigate(['/']))
      ).subscribe()
    }
  }

  get email(): FormControl {
    return this.formLogin.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formLogin.get('password') as FormControl;
  }

}
