import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'hinv-room-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-booking.component.html',
  styleUrl: './room-booking.component.scss'
})
export class RoomBookingComponent implements OnInit {

  // id!: number;

  id$!:Observable<any>;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    // this.id = this.router.snapshot.params['id'];
    // this.id$ = this.router.params.pipe(
    //   map(param => param['id'])
    // )

    this.id$ = this.router.paramMap.pipe(map((params) => params.get('id')))
    // this.router.params.subscribe((pr) => this.id=pr['id']);
  }
}
