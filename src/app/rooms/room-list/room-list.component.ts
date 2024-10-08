import { Component, Input, Output,EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { RoomList } from '../rooms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hinv-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoomListComponent implements OnChanges,OnDestroy{
  @Input() rooms:RoomList[]=[];
  @Output() selectedRoom = new EventEmitter<RoomList>();
  
  @Input() title:string = ''

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room:RoomList){
    this.selectedRoom.emit(room);
  }

  ngOnDestroy():void{
    console.log("On Destroy Executed");
    
  }

}
