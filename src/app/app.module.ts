import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { UsersModule } from './users/users.module';
import { CommonComponentsModule } from './common/common-components.module';
import { UserLayoutComponent } from './layouts/user/user-layout/user-layout.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';
import { LoadingInterceptor } from './common/interceptors/loading.interceptor';
import { LoadingService } from './common/services/loading.service';
@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UsersModule,
    CommonComponentsModule,
    HttpClientModule,
    AdminModule,
  ],
  providers: [LoadingService,{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
