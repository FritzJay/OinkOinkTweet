import {
  Component,
  OnInit,
  Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {
  PageScrollService,
  PageScrollInstance,
  EasingLogic } from 'ng2-page-scroll';
import { TweetService } from './tweet.service';
import { Tweet } from '../Tweet';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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
  twitterHandle: string;
  displayHandle: string;
  tweets: Tweet[];
  isTwitterLoading: boolean;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private tweetService: TweetService,
    private pageScrollService: PageScrollService) { }

  ngOnInit(): void {
    this.isTwitterLoading = false;
  }

  onTranslateClick(): void {
    if (!this.twitterHandle) {
      return
    }
    this.isTwitterLoading = true;
    this.displayHandle = this.twitterHandle;
    this.tweetService.getTweets(this.twitterHandle)
      .subscribe(
        (tweets) => {
          this.tweets = tweets;
          this.isTwitterLoading = false;
          // Scroll to list of populated tweets
          this.scrollToId('#tweetlist');
        },
        (error) => {
          this.isTwitterLoading = false;
          console.log('Error in home.component.ts, onTranslateClick():')
          console.log(<any>error)
        }
      );
  }

  scrollToId(id: string): void {
    console.log(`scrolling to ${id}`)
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.advancedInstance(this.document, '#tweetlist', null, null, true, null, true, this.myEasing, 1000, null);
    this.pageScrollService.start(pageScrollInstance);
  }

  public myEasing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
      // easeInOutExpo easing
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  };
 }
