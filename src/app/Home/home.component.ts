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

export class HomeComponent { }
