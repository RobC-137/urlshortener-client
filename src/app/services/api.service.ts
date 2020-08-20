import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { UrlData, UrlQueryData, ClicksByDate } from '../models/UrlData';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

interface newUrlPayload {
  url: string;
  slug?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private url: string = 'http://localhost:3000/';
  private url: string = 'https://urlshortener137.herokuapp.com/';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getUrlsGroupedByDate(id: string): Observable<ClicksByDate[]> {
    const headers = this.createHeaders();
    // const req = new HttpRequest('GET',`${this.url}url/bydate?id=${id}`);
    return this.http
      .get<ClicksByDate[]>(`${this.url}url/bydate/${id}`, { headers: headers })
      .pipe(
        map((data: ClicksByDate[]) =>
          data.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          })
        )
      );
  }

  getUrls(
    sort: string,
    order: string,
    limit: number,
    page: number
  ): Observable<UrlQueryData> {
    // const req = new HttpRequest('GET', this.url);
    const headers = this.createHeaders();
    return this.http
      .get<UrlQueryData>(
        //backend paginatiion page starts with 1

        `${this.url}url/all?sort=${sort ? sort : ''}&order=${
          order ? order : ''
        }&limit=${limit}&page=${page + 1}`,
        { headers: headers }
      )
      .pipe(
        map((urlObject: UrlQueryData) => {
          urlObject.results = urlObject.results.map((obj) => {
            // obj.shortUrl = obj.domain + obj.slug;
            obj.shortUrl = `${obj.domain}/${obj.slug}`;
            return obj;
          });

          return urlObject;
        })
      );
  }

  postNewUrl(payload: newUrlPayload) {
    // let headers = new HttpHeaders().set('content-type', 'application/json');

    // const user = this.auth.getUserValue();

    // if (user) headers = headers.append('Bearer', user);
    const headers = this.createHeaders();

    console.log(headers);

    return this.http.post(
      this.url + `url/save${this.auth.getUserValue() ? '/user' : ''}`,
      payload,
      { headers: headers }
    );
  }

  deleteUrl(id: string) {
    const headers = this.createHeaders();
    return this.http.delete(this.url + `url/${id}`, { headers: headers });
  }
  createHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('content-type', 'application/json');

    const user = this.auth.getUserValue();

    if (user) headers = headers.append('Authorization', `Bearer ${user}`);
    return headers;
  }
}
