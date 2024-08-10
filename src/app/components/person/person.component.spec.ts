import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('John', 'Doe', 30, 77, 1.8);
    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should the name be "John"', () => {
    expect(component.person.name).toEqual('John');
  });

  it('should render <h1> with "Hola, {component.person.name}"', () => {
    //Arrange
    component.person = new Person('Oscar', 'Medina', 30, 77, 1.8);
    const ecpectMsg = `Hola, ${component.person.name}`;
    const personDebugElement: DebugElement = fixture.debugElement;
    const h1Debug: DebugElement = personDebugElement.query(By.css('h1'));
    const h1Element: HTMLElement = h1Debug.nativeElement;

    //Act
    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos

    //Assert
    expect(h1Element?.textContent).toEqual(ecpectMsg);
  });

  it('should render <p> with "Mi altura es de: {{ person?.height }}"', () => {
    component.person = new Person('Oscar', 'Medina', 30, 77, 1.8);
    const ecpectMsg = `Mi altura es de: ${component.person.height}`;
    const personDebugElement: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebugElement.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;

    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos

    expect(pElement?.textContent).toContain(component.person.height); //toContain para verificar que contenga el texto esperado en el texto del elemento
  });


  it('should display a text with IMC when call IMC', () => {
    //Arrange
    const expectedIMC = 'IMC 23.76543209876543';
    component.person = new Person('Oscar', 'Medina', 30, 77, 1.8);
    const buttonDebugElement = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    //Act
    component.clickIMC();
    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos

    //Assert
    expect(buttonDebugElement.textContent).toContain(expectedIMC);

  });

  it('should display a text with IMC when do click in the button', () => {
    //Arrange
    const expectedIMC = 'IMC 23.76543209876543';
    component.person = new Person('Oscar', 'Medina', 30, 77, 1.8);
    const buttonDebugElement = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement: HTMLElement = buttonDebugElement.nativeElement;
    //Act
    buttonDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos

    //Assert
    expect(buttonElement.textContent).toContain(expectedIMC);

  });

  it('should raise selected event when do click', () => {
    //Arrange
    const expectPerson = new Person('Oscar', 'Medina', 30, 77, 1.8);
    component.person = expectPerson;
    const buttonDebugElement = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    (component.onSelected as unknown as EventEmitter<Person>).subscribe((person: Person) => {
      selectedPerson = person;
    });
    buttonDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos
    //Assert
    expect(selectedPerson).toEqual(expectPerson);
  });

});

@Component({
  standalone: true,
  selector: 'app-host',
  imports: [PersonComponent],
  template: `
    <app-person [person]="person" (onSelected)="onSelected($event)"></app-person>
  `
})
export class HostComponent {
  person: Person = new Person('John', 'Doe', 30, 77, 1.8);

  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }

}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    component.person = new Person('John', 'Doe', 30, 77, 1.8);
    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    //Arrange
    const expectedName = component.person.name;
    const personDebugElement = fixture.debugElement.query(By.css('app-person h1'));
    const personElement: HTMLElement = personDebugElement.nativeElement;
    //Act
    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos
    //Assert
    expect(personElement.textContent).toContain(expectedName);
  });

  it('should raise selected event when do click', () => {
    //Arrange
    const personDebugElement = fixture.debugElement.query(By.css('app-person .btn-choose'));
    //Act
    personDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges(); // detecta los cambios en el componente y sus hijos
    //Assert
    expect(component.selectedPerson).toEqual(component.person);
  });

});
