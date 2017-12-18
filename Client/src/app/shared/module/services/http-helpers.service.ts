import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserStoreService } from './user-store.service'
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

  public getBaseRequestOptionsWithAuth(): RequestOptions {
    let headers = this.getRequestHeadersWithAuth();
    return new RequestOptions({ headers });
  }

  public getFormsRequestOptionsWithAuth(): RequestOptions {
    let headers = this.getformHeaders();
    return new RequestOptions({ headers })
  }

  public getBaseRequestHeaders(): Headers {
    return this.baseHeaders();
  }

  public getformHeaders(): Headers {
    let headers = this.getRequestHeadersWithAuth();
    // headers.set('Content-Type', 'multipart/form-data');
    return headers;
  }

  public getRequestHeadersWithAuth(): Headers {
    return this.authHeaders(this.baseHeaders());
  }


  private baseHeaders(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json;q=0.9, */*;q=0.1');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  private authHeaders(headers: Headers): Headers {
    this.reloadToken();
    headers.append('Authorization', 'Bearer ' + this.token);
    return headers;
  }
  private reloadToken() {
    let token = this.userStoreSvc.getToken();

    if (token && token !== undefined) {
      this.token = this.userStoreSvc.getToken();
    }
  }

}
