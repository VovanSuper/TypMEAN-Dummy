import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { IUser, IEvent } from '../models/';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  baseUrl = '//localhost:8080';
  usersUrl = `${this.baseUrl}/users`;
  eventsUrl = `${this.baseUrl}/events`;
  headers: HttpHeaders;
  // private url: string = `${app.serverHost}:${app.serverPort}`;

  constructor(private httpClient: HttpClient) {
    this.headers = this.getHeaders();
   }
  

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.usersUrl, { headers: this.headers });
  }

  public getEvents(): Observable<IEvent[]> {
    return this.httpClient.get<IEvent[]>(this.eventsUrl, { headers: this.headers });
  }

  public getUserById(id: string | number) {
    return this.httpClient.get<IUser>(`${this.usersUrl}/${id}`);
  }

  public getEventById(id: string | number) {
    return this.httpClient.get<IEvent>(`${this.eventsUrl}/${id}`);
  }



  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }


  private prepareReq(method: HttpMethods | string = 'GET', payload?: any, ) {
    const headers = this.getHeaders();
    // const urlParams = new HttpParams().set('recheck', 'false');
    return new HttpRequest(method, this.usersUrl, { payload }, {
      reportProgress: false,
      headers: headers,
      // params: urlParams,
      withCredentials: false,
      responseType: 'json'
    });
  }
}

export enum HttpMethods {
  GET = 'GET',
  PORT = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT'
}