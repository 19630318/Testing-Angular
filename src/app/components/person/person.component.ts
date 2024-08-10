import { Component, Input, Output } from '@angular/core';
import { Person } from '../../models/person.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {

  @Input() person!: Person;
  @Output() onSelected = new EventEmitter<any>();
  imc: number = 0;

  ngOnInit() {
  }

  clickIMC(){
    this.imc = this.person.weight / Math.pow(this.person.height, 2);
  }

  onClick(){
    this.onSelected.emit(this.person);
  }

}
