import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleComponent, PersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    component.people = [
      { name: 'John', lastName: 'Doe', age: 30, weight: 77, height: 1.8 },
      { name: 'Jane', lastName: 'Doe', age: 25, weight: 55, height: 1.6 },
      { name: 'Alice', lastName: 'Doe', age: 35, weight: 70, height: 1.7 }
    ];
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    expect(debugElement.length).toBe(3);

  });

  it('should have person in selectedPerson when click a selectPerson', () => {
    component.people = [
      { name: 'John XD', lastName: 'Doe', age: 30, weight: 77, height: 1.8 },
      { name: 'Jane', lastName: 'Doe', age: 25, weight: 55, height: 1.6 },
      { name: 'Alice', lastName: 'Doe', age: 35, weight: 70, height: 1.7 }
    ];
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    expect(debugElement.length).toBe(3);

    const buttonChossen = fixture.debugElement.query(By.css('button.btn-choose'));
    buttonChossen.triggerEventHandler('click', null);
    
    expect(component.selectedPerson).toEqual(component.people[0]);

    fixture.detectChanges();
    const liElement = fixture.debugElement.query(By.css('li'));
    const liComponent = liElement.nativeElement;

    expect(liComponent.textContent).toContain(component.people[0].name);

  });

});
