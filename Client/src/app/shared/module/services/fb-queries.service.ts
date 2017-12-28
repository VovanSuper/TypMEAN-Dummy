import { Injectable, Inject } from '@angular/core';
import { IEnvironmentVariables, EnvVariables } from '../../environment/';
import { ApiService } from './api.service';
import {
  FacebookService,
  InitParams,
  LoginResponse,
  UIResponse,
  AuthResponse,
  LoginStatus,
  LoginOptions
} from 'ngx-facebook';

@Injectable()
export class FbQueriesService {
  private fbLoginTried = 0;
  private fbInitParams: InitParams = {
    appId: this.vars.fbAppId,
    version: 'v2.6',
    cookie: false,
    status: false,
    xfbml: true
  }

  constructor(
    private fb: FacebookService,
    private api: ApiService,
    @Inject(EnvVariables) private vars: IEnvironmentVariables
  ) {
    this.fb.init(this.fbInitParams);
  }

  login(): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      // if (this.fbLoginTried++ > 5)
      //   throw new Error('Already tried to login to Fb for more than 5 times; somethings wrong');
      const loginOptions: LoginOptions = {
        enable_profile_selector: true,
        return_scopes: true
        // , scope: 'email,public_profile,user_location,user_photos'
      };
      return this.fb.login(loginOptions)
        .then((resp: LoginResponse) => {
          if (resp.status !== 'connected') {
            // this.login();
            throw new Error(`[fb-login.service->login()]:: Resp.status !=connected; loginResp: ${JSON.stringify(resp)}`)
          }
          console.log('Logged in', resp);

          console.log('[fb-login.service->login()]Access_token: ', resp.authResponse.accessToken);
          return resolve(resp);
        })
        .catch(this.handleError);
    });
  }

  // getProfile() {
  //   this.fb.getLoginStatus().then((logStatus: LoginStatus) => {
  //     if (logStatus.status !== 'connected') {
  //       this.login();
  //     }
  //     let userId = logStatus.authResponse.userID || null;
  //     let accessToken = logStatus.authResponse.accessToken || null;
  //     if (userId) {
  //       this.fb.api(`${userId}?access_token=${accessToken}&fields=id,name,picture,gender,first_name,last_name,email`, 'get',
  //       ).then(res => {
  //         console.dir(res);
  //       })
  //         .catch(console.error);
  //     }
  //   })
  // }

  private handleError(error: any) {
    let errMsg: string;
    errMsg = error.status ? `${error.status} ${error.toString()}` : error.toString();

    console.error(`Erorr in FbQuerirsSvc :: ${errMsg}`);
    return Promise.reject(errMsg);
  }

}
