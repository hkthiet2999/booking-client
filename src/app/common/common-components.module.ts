import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from 'app/material.module';
import { UserActionComponent } from './components/user-action/user-action.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, UserActionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    
  ],
  exports: [
    HeaderComponent,
    UserActionComponent,
  ]
})
export class CommonComponentsModule { }
