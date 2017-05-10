import {
  Component,
  Input,
  OnInit
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
  selector: 'tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css'],
  animations: [
    trigger('flyInOut', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      state('void', style({
        transform: 'translateX(100%)'
      })),
      transition('* <=> void', animate('500ms ease'))
    ])
  ]
})

export class TweetListComponent {
  @Input() twitterHandle: string;
  @Input() tweets: Tweet[];
 }
