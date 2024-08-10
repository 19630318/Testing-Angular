import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HighligthDirective } from '../../directives/highligth.directive';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [CommonModule, FormsModule, HighligthDirective, ReversePipe],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss'
})
export class OthersComponent {

  color = 'blue';
  text = 'roma';

}
