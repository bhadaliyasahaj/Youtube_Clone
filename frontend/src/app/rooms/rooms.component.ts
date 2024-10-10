import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from "./room-list/room-list.component";
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'hinv-rooms',
  standalone: true,
  imports: [CommonModule, RoomListComponent, HeaderComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  hotelname = "SB's Hotel"
  numberOfRooms = 20
  hideRomes = true

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedrooms: 5,
  }

  roomList: RoomList[] = [];

  selectedRoom!: RoomList;

  title: string = 'Room List';

  rooms$;

  roomCount$;

  error$ = new Subject<string>;

  getError$ = this.error$.asObservable();

  subscription!: Subscription;
  constructor(@SkipSelf() private roomsService: RoomsService) {

    this.rooms$ = this.roomsService.getRooms$.pipe(
      
      catchError((err) => {
        console.log(err)
        this.error$.next(err.message)
        return of([])
      })
    );

    this.roomCount$ = this.roomsService.getRooms$.pipe(
      map((rooms)=>rooms.length)
    )
  }




  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.complete()
  })


  ngOnInit(): void {
    this.stream.subscribe({
      next: (data) => console.log(data),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    })
    // console.log(this.headerComponent);
    // this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms
    // })
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View"
    this.headerChildrenComponent.last.title = "Hello EveryOne"
  }

  ngAfterViewChecked(): void {
  }

  // ngDoCheck(): void {
  //   console.log("Do Check Is Working")
  // } Do Check Is Used In Very Few Cases When We Want To Execute Some Code On Every Change Of the UI

  handleselectRoom(room: RoomList) {
    this.selectedRoom = room
  }

  toogle() {
    this.hideRomes = !this.hideRomes;
    this.title = "Rooms List"
  }



  addRoom() {
    const room: RoomList = {
      roomType: 'Delux',
      amenities: 'ac, tv, wifi',
      price: 1000,
      photos: "temp",
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),
      rating: 4.5
    };

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data
    })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Single',
      amenities: 'ac, tv, freewifi',
      price: 2000,
      photos: "temp",
      checkinTime: new Date('11-jan-2023'),
      checkoutTime: new Date('12-jan-2023'),
      rating: 4.5
    }

    this.roomsService.editRoom(room).subscribe(data => {
      this.roomList = data;
    })
  }

  deleteRoom() {
    typeof (this.selectedRoom.roomNumber) == "string" && this.roomsService.deleteRoom(this.selectedRoom.roomNumber).subscribe(data => {
      this.roomList = data;
    })
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe()
  }
}
