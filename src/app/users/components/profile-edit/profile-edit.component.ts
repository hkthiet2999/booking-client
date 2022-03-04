import { UserService } from './../../services/user.services';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

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
  @Input() user: any;

  selectedGender: string | undefined;

  updateForm!: FormGroup;

  // updateForm = this.formBuilder.group({
  //   firstname: '',
  //   lastname: '',
  //   gender: '',
  //   dayOfBirth: ''
  // });

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      firstname: [null, [Validators.minLength(5)]],
      lastname: [null, [Validators.minLength(5)]],
      gender: [null],
      dateOfBirth: [null],
      
    });

    
  }

  saveDetails(form: { value: any }) {
    // let jsonValue = JSON.stringify(form.value, null, 4);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
    this.updateUserInfo(form);
  }

  genderOptions: GenderOptions[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' },
  ];

  async updateUserInfo(form: { value: string }) {
    await this.userService
      .updateUser(
        'd8679948-57c4-4d3e-a078-0aae6aa3f73a',
        JSON.stringify(form.value),
      )
      .subscribe();

    window.location.reload();
  }
}
