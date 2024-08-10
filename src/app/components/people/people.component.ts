import { Component } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {

  selectedPerson: Person | undefined;

  people: Person[] = [
    new Person('John', 'Doe', 30, 77, 1.8),
    new Person('Jane', 'Doe', 28, 60, 1.6),
    new Person('Alice', 'Doe', 25, 55, 1.6),
    new Person('Bob', 'Doe', 33, 85, 1.9)
  ];

  choosePerson(person: Person) {
    this.selectedPerson = person;
  }

}
