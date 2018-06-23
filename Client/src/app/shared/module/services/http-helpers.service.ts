import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { UserStoreService } from './user-store.service';
import { Request } from '@angular/http/src/static_request';

@Injectable()
export class HttpHelpersService {
  private token = '';

  constructor(private http: Http, private userStoreSvc: UserStoreService) {
    this.reloadToken();
  }

  public getBaseRequestOptions(): RequestOptions {
    let headers = this.getBaseRequestHeaders();
    return new RequestOptions({ headers });
  }

  public getBaseRequestOptionsWithAuth(token: string = ''): RequestOptions {
    let headers = this.getRequestHeadersWithAuth(token);
    return new RequestOptions({ headers });
  }

  public getBaseRequestOptionsWithFbAccessTokenAuth(
    access_token: string,
  ): RequestOptions {
    let headers = this.getRequestHeadersWithFbAccessTokenAuth(access_token);
    return new RequestOptions({ headers });
  }

  public getFormsRequestOptionsWithAuth(): RequestOptions {
    let headers = this.getformHeaders();
    return new RequestOptions({ headers });
  }

  public getBaseRequestHeaders(): Headers {
    return this.baseHeaders();
  }

  public getformHeaders(): Headers {
    let headers = this.getRequestHeadersWithAuth();
    // headers.set('Content-Type', 'multipart/form-data');
    return headers;
  }

  public getRequestHeadersWithAuth(token: string = ''): Headers {
    return this.authHeaders(this.baseHeaders(), token);
  }
  public getRequestHeadersWithFbAccessTokenAuth(access_token: string): Headers {
    return this.authFbAccessTokenHeaders(this.baseHeaders(), access_token);
  }

  private baseHeaders(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9, */*;q=0.1');
    // headers.append('Content-Type', 'application/json');
    return headers;
  }
  private authHeaders(headers: Headers, token: string = ''): Headers {
    if (!token || token.trim() === '') token = this.userStoreSvc.getToken();
    headers.set('Authorization', 'Bearer ' + token);
    return headers;
  }
  private authFbAccessTokenHeaders(
    headers: Headers,
    access_token: string,
  ): Headers {
    headers.append('access_token', access_token);
    return headers;
  }
  private reloadToken() {
    let token = this.userStoreSvc.getToken();

    if (token && token !== undefined) {
      this.token = this.userStoreSvc.getToken();
    } else {
      console.log(
        `[http-helpers.svc->reloadToken()]:: No token in store; token: ${token}`,
      );
    }
  }
}
