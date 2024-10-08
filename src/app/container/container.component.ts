import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { EmployeComponent } from '../employe/employe.component';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements AfterContentInit {


  @ContentChild(EmployeComponent) employee! : EmployeComponent;

  ngAfterContentInit(): void {
    this.employee.empname = "Sahaj"
  }
}
