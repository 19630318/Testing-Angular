import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highligth]',
  standalone: true
})
export class HighligthDirective {

  defaultColor = 'gray';
  @Input('highligth') set bgColor(color: string) {
    this.element.nativeElement.style.backgroundColor = color || this.defaultColor;
  }

  constructor(
    private element: ElementRef
  ) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
   }

}
