import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { BookingpageComponent } from './components/bookingpage/bookingpage.component';
import { HomeComponent } from './components/home/home.component';
import { RoommenuComponent } from './components/roommenu/roommenu.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_model/role';
import { ErrorCodeComponent } from './sharepage/error-code/error-code.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  {
    path: 'users',
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Admin] },
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
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
  // otherwise redirect to 404
  { path: '404', component: ErrorCodeComponent },
  { path: '**', redirectTo: '404' },

  // user + admin routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
