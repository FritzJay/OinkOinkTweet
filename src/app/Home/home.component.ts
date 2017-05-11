import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { PageScrollService, PageScrollInstance, EasingLogic } from 'ng2-page-scroll';
import { TweetService } from '../tweet.service';
import { Tweet } from '../Tweet';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  twitterHandle: string;
  displayHandle: string;
  tweets: Tweet[];
  names: string[];
  namesStore: string[];
  nextNamesLoad: number;
  isTwitterLoading: boolean;
  isDBLoading: boolean;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private tweetService: TweetService,
    private pageScrollService: PageScrollService) { }

  ngOnInit(): void {
    this.nextNamesLoad = Date.now();
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
