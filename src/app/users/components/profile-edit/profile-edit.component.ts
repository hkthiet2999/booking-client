import { UserService } from './../../services/user.services';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth-service';

interface GenderOptions {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'edit-profile',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class EditProfileComponent implements OnInit {

  user: any;
  userId: any;

  selectedGender: string | undefined;
  updatedUserId!: string;
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: [null, [Validators.minLength(5), Validators.required]],
      lastname: [null, [Validators.minLength(5), Validators.required]],
      gender: [null],
      dateOfBirth: [null],
    });
    this.userId = this.authService.userValue.id;

    this.userService.findUserBy(this.userId).subscribe((data) => {
      this.user = data;
      this.form.setValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        gender: this.user.gender,
        dateOfBirth: this.user.dateOfBirth,
      });
    });

  
  }
  genderOptions: GenderOptions[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' },
  ];

  updateUserInfo(form: { value: string }) {


    this.userService
      .updateUser(this.user.id, JSON.stringify(form.value))
      .subscribe((user) => {
        this.updatedUserId = user.id;
        return this.userService.findUserBy(this.updatedUserId);
      });

    // window.location.reload();
  }
}
