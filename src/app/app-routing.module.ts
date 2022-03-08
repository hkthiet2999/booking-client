import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BookingpageComponent } from './components/bookingpage/bookingpage.component';
import { HomeComponent } from './components/home/home.component';
import { RoommenuComponent } from './components/roommenu/roommenu.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_model/role';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Admin, Role.User] },
  // },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'roommenu',
    component: RoommenuComponent,
  },
  {
    path: 'booking/:roomId',
    component: BookingpageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User] },
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
