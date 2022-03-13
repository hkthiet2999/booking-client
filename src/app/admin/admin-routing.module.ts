import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingSectionComponent } from 'app/components/BookingComponents/booking-section/booking-section.component';
import { RoomComponent } from 'app/components/room/room.component';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout/admin-layout.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     component: AdminLayoutComponent
  //   }

  { path: '', component: AdminLayoutComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'booking-management', component: BookingSectionComponent },
  { path: 'room-management', component: RoomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
