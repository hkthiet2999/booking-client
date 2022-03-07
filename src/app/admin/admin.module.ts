import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'app/material.module';
import { CommonComponentsModule } from 'app/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    CommonComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserManagementComponent
  ]
})
export class AdminModule { }
