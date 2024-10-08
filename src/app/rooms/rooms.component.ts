import { AfterViewChecked, AfterViewInit, Component ,OnInit, QueryList, SkipSelf, ViewChild, ViewChildren} from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from "./room-list/room-list.component";
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent implements OnInit,AfterViewInit,AfterViewChecked{
  hotelname = "SB's Hotel"
  numberOfRooms = 20
  hideRomes = false

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedrooms: 5,
  }

  roomList: RoomList[] = [];

  selectedRoom! : RoomList

  title:string = 'Room List'

  @ViewChild(HeaderComponent) headerComponent!:HeaderComponent;
  
  @ViewChildren(HeaderComponent) headerChildrenComponent!:QueryList<HeaderComponent>;
  
  constructor(@SkipSelf() private roomsService:RoomsService){ }
  ngOnInit(): void {
    // console.log(this.headerComponent);
    this.roomList = this.roomsService.getRooms();   
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View"
    this.headerChildrenComponent.last.title = "Hello EveryOne"
  }
  
  ngAfterViewChecked():void{
  }

  // ngDoCheck(): void {
  //   console.log("Do Check Is Working")
  // } Do Check Is Used In Very Few Cases When We Want To Execute Some Code On Every Change Of the UI

  handleselectRoom(room:RoomList){
    this.selectedRoom = room
  }

  toogle() {
    this.hideRomes = !this.hideRomes;
    this.title = "Rooms List"
  }

  

  addRoom(){
    const room:RoomList = {
      roomNumber: 5,
      roomType: 'single',
      amenities: 'ac, tv, wifi',
      price: 1000,
      photos:"temp",
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),
      rating: 4.5
    };

    this.roomList = [...this.roomList,room]
  }

  
}
