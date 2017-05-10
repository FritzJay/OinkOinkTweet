import {
  Component,
  Input
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Tweet } from '../Tweet';

@Component({
  selector: 'name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.css'],
  animations: [
    trigger('flyInOut', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      state('void', style({
        transform: 'translateX(100%)'
      })),
      transition('* <=> void', animate('100ms ease'))
    ])
  ]
})

export class NameListComponent {
  @Input() names: string;
 }
