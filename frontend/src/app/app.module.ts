import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { ContainerComponent } from './container/container.component';
import { EmployeComponent } from './employe/employe.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,CommonModule
  ],
  providers:[
    {
      provide:APP_SERVICE_CONFIG,
      useValue:APP_CONFIG,
    }
  ],
  bootstrap:[]
})
export class AppModule { }
