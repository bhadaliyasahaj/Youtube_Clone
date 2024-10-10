import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employe',
  standalone: true,
  imports: [],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss',
  // providers:[RoomsService]
})
export class EmployeComponent {
  empname:string = 'john';

  // constructor(@Self()  private roomsService:RoomsService){

  // }
}
