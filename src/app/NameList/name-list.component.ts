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
import { TweetService } from '../tweet.service';
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
      transition('void => *', animate('100ms ease'))
    ])
  ]
})

export class NameListComponent {
  names: string[];
  namesStore: string[];
  nextNamesLoad: number;
  isDBLoading: boolean;

  constructor(private tweetService: TweetService) {}

  ngOnInit() {
    this.nextNamesLoad = Date.now();
  }

  onSearchClick(): void {
    if (this.names === undefined) {
      // If it hasn't been 5 seconds since last db query
      if (this.nextNamesLoad > Date.now()) {
        // Use the in memory store of names
        this.names = this.namesStore;
        return;
      }
      // Set button to .loading
      this.isDBLoading = true;
      // Set timestamp for next available db query to 5 seconds from last query
      this.nextNamesLoad = Date.now() + 5000
      // Get tweets from tweet service
      this.tweetService.getNames()
      .subscribe(
        (names) => {
          this.names = names;
          this.isDBLoading = false;
        },
        (error) => {
          this.isDBLoading = false;
          console.log('Error: in home.component.ts, onSearchClick():')
          console.log(<any>error);
        }
      );
    } else {
      this.namesStore = this.names;
      this.names = undefined;
      this.isDBLoading = false;
    }
  }
 }
