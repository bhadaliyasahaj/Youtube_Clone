import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoomsService {


  roomList: RoomList[] = [];

  getRooms$;

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) {
    console.log(this.config.apiEndpoint);

    console.log("service is runing");
    // console.log(this.http.get('/api/rooms'));
    this.getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
      shareReplay(1)
    );
  }


  getRooms() {
    console.log("running");

    return this.http.get<RoomList[]>('/api/rooms')
  }


  addRoom(room: RoomList) {
    
    return this.http.post<RoomList[]>('/api/rooms', room);
  }
  
  editRoom(room: RoomList) {
    console.log("running");
    const newHeaders = new HttpHeaders({token:"3232342432"});
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room,{
      headers:newHeaders
    })
  }

  deleteRoom(roomId: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${roomId}`);
  }
}
