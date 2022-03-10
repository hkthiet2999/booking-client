import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout/admin-layout.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     component: AdminLayoutComponent
  //   }

  { path: 'management', component: AdminLayoutComponent },
  { path: 'guest', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
