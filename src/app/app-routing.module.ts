import { ProfileMainComponent } from './users/profile-main/profile-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user/user-layout/user-layout.component';

const routes: Routes = [

  {
    path: '',
    component: UserLayoutComponent,
  },
  { path: 'users/profile', component: ProfileMainComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
