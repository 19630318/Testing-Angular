import { Component } from '@angular/core';
import { HighligthDirective } from './highligth.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import e from 'express';

@Component({
  standalone: true,
  selector: 'app-others',
  template: `
    <h5 class="title" highligth>Hay un valor</h5>
    <h5 highligth="yellow">Hay otro valor yellow</h5>
    <p highligth="yellow">Parrafo</p>
    <p>Otro parrafo</p>
    <input [(ngModel)]="color" placeholder="color" [highligth]="color">
  `,
  imports: [HighligthDirective, FormsModule]
}) 
export class HostComponent {
  color = 'blue';
}

describe('HighligthDirective', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HostComponent, HighligthDirective]
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have a three highlighted elements', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const elements2 = fixture.debugElement.queryAll(By.css('*:not([highligth])'));
    expect(elements.length).toBe(4);
    expect(elements2.length).toBe(2);
  });

  it('should the elements have the correct background color', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toBe('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toBe('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toBe('yellow');
  });

  it('should the h5.title be defaultcolor', () => {
    const elements = fixture.debugElement.query(By.css('.title'));
    const dir = elements.injector.get(HighligthDirective); //El injector es el que se encarga de inyectar la directiva en el componente o elemento que la necesite
    expect(elements.nativeElement.style.backgroundColor).toEqual(dir.defaultColor); //El defaultColor es el color por defecto que se le asigna a la directiva
  });

  it('shouuld bind <input> and change color', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    expect(inputEl.style.backgroundColor).toBe('blue');
    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input')); // Dispara el evento input para que se actualice el valor del input y se actualice el color
    fixture.detectChanges();
    expect(inputEl.style.backgroundColor).toBe('red');
    expect(component.color).toBe('red');
  });

});
