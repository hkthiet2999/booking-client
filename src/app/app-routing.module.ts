import { ProfileMainComponent } from './users/profile-main/profile-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';

const routes: Routes = [

  {
    path: '',
    component: UserLayoutComponent,
  },
  { path: 'users/profile', component: ProfileMainComponent },
  { path: 'admin/management', component: AdminLayoutComponent },
  { path: 'admin/guest', component: UserManagementComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
