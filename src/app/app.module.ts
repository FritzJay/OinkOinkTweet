import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { TweetListComponent } from './TweetList/tweet-list.component';
import { NameListComponent } from './NameList/name-list.component'
import { TweetService } from './tweet.service';

import { Ng2PageScrollModule  } from 'ng2-page-scroll';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TweetListComponent,
    NameListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    Ng2PageScrollModule.forRoot()
  ],
  providers: [
    TweetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
