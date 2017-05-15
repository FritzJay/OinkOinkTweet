import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Tweet } from '../Tweet';
import { environment } from '../../environments/environment';

@Injectable()
export class TweetService {
  private twitterUrl = environment.twitterUrl;

  constructor(private http: Http) {
    console.log(this.twitterUrl);
  }

  getTweets(twitterHandle: string): Observable<Tweet[]> {
    let url = this.twitterUrl + twitterHandle
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
    console.log('Error in handleError()--');
    console.log(err);
    return Observable.throw(err);
  }
}
