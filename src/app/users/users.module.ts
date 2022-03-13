import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonComponentsModule } from './../common/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileViewDetailsComponent } from './components/profile-view-details/profile-view-details.component';
import { EditProfileComponent } from './components/profile-edit/profile-edit.component';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    ProfileMainComponent,
    ProfileViewDetailsComponent,
    EditProfileComponent,
    AvatarComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  exports: [
    ProfileMainComponent

  ]
})
export class UsersModule { }
