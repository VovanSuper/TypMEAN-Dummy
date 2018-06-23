import { Injectable, Inject } from '@angular/core';
import { UserStoreService } from './user-store.service';
import { Http, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { IUser } from '../../interfaces/';
import { HttpHelpersService, ApiService } from './index';
import { FbQueriesService } from './fb-queries.service';
import { EnvVariables, IEnvironmentVariables } from '../../environment/';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper = new JwtHelper();
  isLoggedChange$: BehaviorSubject<boolean>;

  constructor(
    private userStoreSvc: UserStoreService,
    private http: Http,
    private httpHelpers: HttpHelpersService,
    private api: ApiService,
    private fbQSvc: FbQueriesService,
    @Inject(EnvVariables) private vars: IEnvironmentVariables,
  ) {
    this.init();
  }
  get currentUser(): IUser {
    return this.getUser();
  }

  get isAuthenticated(): boolean {
    let token = this.userStoreSvc.getToken();
    return token !== (null || undefined);
  }

  getUser(): IUser {
    if (!this.isAuthenticated) return null;

    this.tokenInfo(this.userStoreSvc.getToken());
    console.log(
      `[auth.service->currnetUser()]:: ${this.userStoreSvc.getUserInfo()}`,
    );
    return this.userStoreSvc.getUserInfo();
  }

  logout(): void {
    this.userStoreSvc.erase();
    this.isLoggedChange$.next(false);
  }

  loginLocal(username: string, password: string): Promise<boolean> {
    let body = { username, password };
    let opts = this.httpHelpers.getBaseRequestOptions();
    return new Promise((resolve, reject) => {
      this.http
        .post(this.vars.loginUrl, body, opts)
        .map((resp: Response) => resp.json())
        .subscribe(resp => {
          let token = resp['data'] && resp['data'].token;
          if (token && token !== undefined) {
            this.tokenInfo(token);
            this.saveUser(resp['data']);
            resolve(true);
            // this.isLoggedChange$.next(true);
          } else {
            reject(false);
          }
        }, this.handleError);
    });
  }

  loginFb(): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.fbQSvc
        .login()
        .then(login => {
          let fb_access_token = login.authResponse.accessToken;
          if (!fb_access_token || fb_access_token === undefined)
            throw new Error(
              `[auth.svc=>loginFb()]:: Excpected fb access_token, got: ${fb_access_token}`,
            );

          this.api.authFb(fb_access_token).then(token => {
            console.log(`[auth.svc->loginFb()]:: jwt token is ${token}`);
            this.tokenInfo(token);
            this.userStoreSvc.saveToken(token);
            let payload = this.jwtHelper.decodeToken(token);
            console.log(`[auth.svc->loginFb()]:: payload from jwt: ${payload}`);
            let mongoId = payload.id;
            console.log(`[auth.svc->loginFb()]:: mongoId from jwt: ${mongoId}`);
            if (!mongoId) throw new Error('Error in jwt token responce');

            this.api
              .getUserById(mongoId, token)
              .then(user => {
                if (!user || user === undefined) {
                  console.log(
                    `loginFb, No user came from server; user is : ${user}`,
                  );
                  return reject('No user came back');
                }
                console.log(
                  `[auth.svc->loginFb()->getUserById]:: User came from db: ${JSON.stringify(
                    user,
                  )}`,
                );
                this.saveUser(user);
                resolve(user);
                this.isLoggedChange$.next(true);
              })
              .catch(err => {
                this.handleError(err);
                console.log(`[auth.svc->loginFb()]:: ${err}`);
              });
          });
        })
        .catch(err => {
          console.log(`[auth.svc->loginFb()]:: ${err}`);
          this.handleError(err);
        });
    });
  }

  forgotPassword(email: string): Promise<any> {
    //TODO: sanitize input from client (email)
    let body = JSON.stringify({ email });
    let opts = this.httpHelpers.getBaseRequestOptions();
    return new Promise((resolve, reject) => {
      this.http
        .post(this.vars.forgotPasswordUrl, body, opts)
        .map((resp: Response) => resp.json())
        .subscribe(resp => resolve(resp['data'].message), this.handleError);
    });
  }

  saveUser(data: IUser & { [token: string]: any }) {
    let user: IUser & { [token: string]: any } = {
      id: data.id,
      name: data.name,
      email: data.email,
      gender: data.gender,
      registered: data.registered,
      work_place: data.work_place,
      avatarUrl: data.avatarUrl,
      events: data.events,
      token: data.token,
    };
    this.userStoreSvc.setUserInfo(user);
    // this.isLoggedChange$.next(true);
  }

  private init() {
    this.isLoggedChange$ = this.userStoreSvc.getToken()
      ? new BehaviorSubject(true)
      : new BehaviorSubject(false);
  }

  private tokenInfo(token) {
    console.log(
      '[AuthenticationProvider:login] token expired?: ',
      this.jwtHelper.isTokenExpired(token),
    );
    console.log(
      '[AuthenticationProvider:login] token decoded: ',
      this.jwtHelper.decodeToken(token),
    );
    console.log(
      '[AuthenticationProvider:login] token exp date: ',
      this.jwtHelper.getTokenExpirationDate(token),
    );
  }
  private handleError(error: any) {
    let errMsg: string;
    errMsg = error.status
      ? `${error.status} ${error.toString()}`
      : error.toString();

    console.error(`Erorr in FbQuerirsSvc :: ${errMsg}`);
    return Promise.reject(errMsg);
  }
}
