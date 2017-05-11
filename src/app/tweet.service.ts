import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Tweet } from './Tweet';
import { environment } from '../environments/environment.prod';

@Injectable()
export class TweetService {
  private urls = environment.urls;

  constructor(private http: Http) {}

  getNames(): Observable<string[]> {
    let url = this.urls['database'];
    // Create Headers
    let headers = new Headers({
      'Content-Type': 'text/plain'
    })
    // Create request options
    let options = new RequestOptions({
      method: RequestMethod.Get,
      url: url,
      headers: headers
    })
    // Send request and return results
    return this.http.get(url)
      .map(this.extractNames)
      .catch(this.handleError);
  }

  extractNames(res: Response) {
    console.log('From extractNames-- Results:')
    console.log(res)
    let names = [];
    for (let name of res.json()) {
      console.log('From extractNames--Name: ' + name.initcap)
      names.push(name.initcap);
    }
    return names;
  }

  getTweets(twitterHandle: string): Observable<Tweet[]> {
    // Create url needed to query our server
    let url = this.urls.twitter + twitterHandle;
    // Create Headers
    let headers = new Headers({
      'Content-Type': 'text/plain'
    })
    // Create request options
    let options = new RequestOptions({
      method: RequestMethod.Get,
      url: url,
      headers: headers
    })
    // Send request and return results
    return this.http.get(url)
      .map(this.extractTweets)
      .catch(this.handleError);
  }

  extractTweets(res: Response) {
    return res.json() ? res.json() as Tweet[] : {};
  }

  handleError(err: Response | any) {
    console.log('Error in handleError()--')
    console.log(err);
    return Observable.throw(err);
  }
}
