import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [
    { 
      roomNumber: 1,
      roomType: 'single',
      amenities: 'ac, tv, wifi',
      price: 1000,
      photos:"temp",
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),
      rating: 4.5
    },
    {
      roomNumber: 2,
      roomType: 'double',
      amenities: 'ac, tv, wifi',
      price: 2000,
      photos:"temp",
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),
      rating: 3.5
    },
    {
      roomNumber: 3,
      roomType: 'deluxe',
      amenities: 'ac, tv, wifi',
      price: 3000,
      photos:"temp",
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),
      rating: 4.5
    },
    {
      roomNumber: 4,
      roomType: 'presidential',
      amenities: 'ac, tv, wifi',
      price: 4000,
      photos:"temp",
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),  
      rating: 5
    }
  ]

  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfig) { 
    console.log(this.config.apiEndpoint);
    
    console.log("service is runing");
  }

  getRooms(){
    return this.roomList
  }
}
