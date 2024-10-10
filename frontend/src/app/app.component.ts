import { AfterViewInit, Component, ViewChild, ViewContainerRef, OnInit, ElementRef, inject, Inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RoomsComponent } from "./rooms/rooms.component";
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "./container/container.component";
import { EmployeComponent } from "./employe/employe.component";
import { localStorageToken } from './localstorage.token';
import { AppNavComponent } from "./app-nav/app-nav.component";

@Component({
  selector: 'hinv-root',
  standalone: true,
  imports: [RouterOutlet, RoomsComponent, CommonModule, ContainerComponent, EmployeComponent, RouterModule, AppNavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  role = "Admin"

  @ViewChild('name', { static: true }) name!: ElementRef;

  
  constructor(@Inject(localStorageToken) private localstorage:any){
  }
  
  ngOnInit(): void {
    this.name.nativeElement.innerText = "Hotel Inventory Management"
    this.localstorage.setItem('name',"SB's Hotel")
  }

  // @ViewChild('user',{read:ViewContainerRef}) vcr!:ViewContainerRef;

  // ngAfterViewInit():void{
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50
  // }

}
