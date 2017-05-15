import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class NameService {
  private databaseUrl = environment.databaseUrl;

  constructor(private http: Http) {
    console.log(this.databaseUrl);
  }

  getNames(): Observable<string[]> {
    // Create Headers
    let headers = new Headers({
      'Content-Type': 'text/plain'
    })
    // Create request options
    let options = new RequestOptions({
      method: RequestMethod.Get,
      url: this.databaseUrl,
      headers: headers
    })
    // Send request and return results
    return this.http.get(this.databaseUrl)
      .map(this.extractNames)
      .catch(this.handleError);
  }

  extractNames(res: Response) {
    console.log('From extractNames-- Results:');
    console.log(res);
    let names = [];
    for (let name of res.json()) {
      console.log('From extractNames--Name: ' + name);
      names.push(name);
    }
    return names;
  }

  handleError(err: Response | any) {
    console.log('Error in handleError()--');
    console.log(err);
    return Observable.throw(err);
  }
}
