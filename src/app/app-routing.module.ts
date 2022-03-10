import { ProfileMainComponent } from './users/profile-main/profile-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
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
  //   path: '',
  //   component: UserLayoutComponent,
  // },
  { path: 'users/profile', component: ProfileMainComponent },
  { path: 'admin/management', component: AdminLayoutComponent },
  { path: 'admin/guest', component: UserManagementComponent },
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

  // user + admin routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
