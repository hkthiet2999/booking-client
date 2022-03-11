import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Optional, Output } from '@angular/core';
import { CustomValidators } from 'app/admin/_helpers/custom-validators';
import { AdminService } from 'app/admin/services/admin.service';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  formCreateUser: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  }, {
    validators: CustomValidators.passwordsMatching
  })

  usersAPI!: any;

  @Output() usersUpdated = new EventEmitter<any>();

  constructor(
    private adminService: AdminService,
    
  ) { }

  ngOnInit(): void {
   
  }

  onSave = new EventEmitter();

  onCreateUser(formCreateUser: { value: string }) { 
    this.adminService.createUser(
      JSON.stringify(formCreateUser.value)
    ).subscribe( (any) : any => {
      this.adminService.getAllUsers().subscribe( (data: any) => {
        this.usersAPI = data;
        // console.log('Updated users:',this.usersAPI);
        this.onSave.emit(this.usersAPI);
      });
    }
      
    )
  }
  
  get email(): FormControl {
    return this.formCreateUser.get('email') as FormControl;
  }

  get firstname(): FormControl {
    return this.formCreateUser.get('firstname') as FormControl;
  }

  get lastname(): FormControl {
    return this.formCreateUser.get('lastname') as FormControl;
  }

  get password(): FormControl {
    return this.formCreateUser.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.formCreateUser.get('passwordConfirm') as FormControl;
  }


}
