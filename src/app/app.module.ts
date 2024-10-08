import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { ContainerComponent } from './container/container.component';



@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomListComponent,
    ContainerComponent,
    
  ],
  imports: [
    CommonModule
  ],
  providers:[
    {
      provide:APP_SERVICE_CONFIG,
      useValue:APP_CONFIG,
    }
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
