import { FormsModule } from '@angular/forms';
import { ReversePipe } from './reverse.pipe';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('ReversePipe', () => {

  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the reverse of a string', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('roma')).toBe('amor');
  });

  it('should return the reverse of a string', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('123')).toBe('321');
  });


});


@Component({
  standalone: true,
  selector: 'app-others',
  template: `
    <h5 class="title" >{{ 'My text' | reverse }}</h5>
    <input [(ngModel)]="text" placeholder="color" >
    <p>{{ text | reverse }}</p>
  `,
  imports: [FormsModule, ReversePipe]
}) 
export class HostComponent {text= 'My text';}

describe('ReversePipe with host component', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HostComponent, ReversePipe]
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should return the reverse of a string from <h5>', () => {
    const elements = fixture.debugElement.query(By.css('.title'));
    expect(elements.nativeElement.textContent).toBe('txet yM');
  });

  it('should return the reverse of a string from <input>', () => {
    const elements = fixture.debugElement.query(By.css('input'));
    const input = elements.nativeElement as HTMLInputElement;
    input.value = 'roma';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent).toBe('amor');
  });

});