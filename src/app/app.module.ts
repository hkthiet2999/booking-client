import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { UsersModule } from './users/users.module';
import { CommonComponentsModule } from './common/common-components.module';
import { UserLayoutComponent } from './layouts/user/user-layout/user-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';
import { LoadingInterceptor } from './common/interceptors/loading.interceptor';
import { LoadingService } from './common/services/loading.service';
// Tom
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { RoommenuComponent } from './components/roommenu/roommenu.component';
import { BookingpageComponent } from './components/bookingpage/bookingpage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorCodeComponent } from './sharepage/error-code/error-code.component';
import { BookingModule } from './components/BookingComponents/booking.module';
import { RoomComponent } from './components/room/room.component';
import { RoomHeaderComponent } from './components/room/room-header/room-header.component';
import { RoomTableComponent } from './components/room/room-table/room-table.component';
import { RoomImgCellComponent } from './components/room/room-img-cell/room-img-cell.component';
import { DialogFormComponent } from './components/room/dialog-form/dialog-form.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    RoommenuComponent,
    BookingpageComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    ErrorCodeComponent,
    RoomComponent,
    RoomHeaderComponent,
    RoomTableComponent,
    RoomImgCellComponent,
    DialogFormComponent,
    RoomCardComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UsersModule,
    CommonComponentsModule,
    HttpClientModule,
    AdminModule,
    BookingModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AppModule {}
