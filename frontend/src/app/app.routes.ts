import { Routes } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomBookingComponent } from './rooms/room-booking/room-booking.component';

export const routes: Routes = [
    {
        path:"employee",component:EmployeComponent
    },
    {
        path:"rooms",component:RoomsComponent
    },
    {
        path:"rooms/:id",component:RoomBookingComponent
    },
    {
        path:"",redirectTo:"/rooms",pathMatch:"full"
    },
    {
        path:"**",component:NotfoundComponent
    }
];
