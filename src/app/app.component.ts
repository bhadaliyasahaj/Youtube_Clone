import { AfterViewInit, Component, ViewChild, ViewContainerRef,OnInit, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomsComponent } from "./rooms/rooms.component";
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "./container/container.component";
import { EmployeComponent } from "./employe/employe.component";

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template:`<h1>It is First Angular Website</h1><p>Builded By Sahaj</p>`,
  styleUrl: './app.component.scss'
  // styles:[`h1{color:red}`]
})
export class AppComponent implements OnInit{
  title = 'hotelinventoryapp';
  role = "Admin"

  @ViewChild('name',{static:true}) name! : ElementRef;

  ngOnInit():void{
    this.name.nativeElement.innerText = "Hotel Inventory Management"
  }


  // @ViewChild('user',{read:ViewContainerRef}) vcr!:ViewContainerRef;

  // ngAfterViewInit():void{
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50
  // }

}
