import { Injectable, Inject } from '@angular/core';
import { UserStoreService } from './user-store.service';
import { Http, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { IUser } from '../../interfaces/';
import { HttpHelpersService, FbQueriesService } from './';
import { EnvVariables, IEnvironmentVariables } from '../../environment/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper = new JwtHelper();
  isLoggedChange$: BehaviorSubject<boolean>;

  constructor(
    private userStoreSvc: UserStoreService,
    private http: Http,
    private httpHelpers: HttpHelpersService,
    // private fb: FbQueriesService,
    @Inject(EnvVariables) private vars: IEnvironmentVariables
  ) {
    this.init();
  }
  get currentUser(): IUser {
    return this.getUser();
  }

  isAuthenticated(): boolean {
    let token = this.userStoreSvc.getToken();
    return (token !== null);
  }

  getUser(): IUser {
    if (!this.isAuthenticated)
      return null;

    this.tokenInfo(this.userStoreSvc.getToken());
    console.log(`[auth.service->currnetUser()]:: ${this.userStoreSvc.getUserInfo()}`);
    return this.userStoreSvc.getUserInfo();
  }

  logout(): void {
    this.userStoreSvc.erase();
    this.isLoggedChange$.next(false);
  }

  login(username: string, password: string): Promise<boolean> {
    let body = { username, password };
    let opts = this.httpHelpers.getBaseRequestOptions();
    return new Promise((resolve, reject) => {
      this.http.post(this.vars.loginUrl, body, opts).map((resp: Response) => resp.json()).subscribe(
        (resp) => {
          let token = resp['data'] && resp['data'].token;
          if (token && token !== undefined) {
            this.tokenInfo(token);
            this.saveUser(resp['data']);
            resolve(true);
          } else {
            reject(false);
          }
        },
        (error) => {
          console.log(error);
          reject(false);
        }
      );
    });
  }

  fbLogin() {

  }

  forgotPassword(email: string): Promise<any> {
    //TODO: sanitize input from client (email)
    let body = JSON.stringify({ email });
    let opts = this.httpHelpers.getBaseRequestOptions();
    return new Promise((resolve, reject) => {
      this.http.post(this.vars.forgotPasswordUrl, body, opts).map((resp: Response) => resp.json()).subscribe(
        (resp) => resolve(resp['data'].message),
        (error) => reject(error)
      );
    });
  }

  public saveUser(data: IUser & { [token: string]: any }) {
    let user: IUser & { [token: string]: any } = {
      id: data.id,
      name: data.name,
      email: data.email,
      gender: data.gender,
      registered: data.registered,
      work_place: data.work_place,
      avatarUrl: data.avatarUrl,
      events: data.events,
      token: data.token
    };
    this.userStoreSvc.setUserInfo(user);
    this.isLoggedChange$.next(true);
  }

  private init() {
    this.isLoggedChange$ = (this.userStoreSvc.getToken()) ? new BehaviorSubject(true) : new BehaviorSubject(false);
  }

  private tokenInfo(token) {
    console.log('[AuthenticationProvider:login] token expired?: ', this.jwtHelper.isTokenExpired(token));
    console.log('[AuthenticationProvider:login] token decoded: ', this.jwtHelper.decodeToken(token));
    console.log('[AuthenticationProvider:login] token exp date: ', this.jwtHelper.getTokenExpirationDate(token));
  }
}