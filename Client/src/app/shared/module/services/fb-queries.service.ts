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

  constructor(
    private fb: FacebookService,
    private api: ApiService,
    @Inject(EnvVariables) private vars: IEnvironmentVariables
  ) {
    console.log('Initializing Facebook');
    fb.init({
      appId: this.vars.fbAppId,
      version: 'v2.11'
    });
  }

  login(): Promise<AuthResponse | void> {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true
      // , scope: 'email,public_profile,user_location,user_photos'
    };
    return this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        if (res.status !== 'connected') {
          this.login();
        }
        console.log('Logged in', res);
        if (!res) throw new Error(`[fb-login.service->login()]:: No LoginResponse`);
        return res.authResponse;
      })
      .catch(this.handleError);
  }

  getProfile() {
    this.fb.getLoginStatus().then((logStatus: LoginStatus) => {
      if (logStatus.status !== 'connected') {
        this.login();
      }
      let userId = logStatus.authResponse.userID || null;
      let accessToken = logStatus.authResponse.accessToken || null;
      if (userId) {
        this.fb.api(`${userId}?access_token=${accessToken}&fields=id,name,picture,gender,first_name,last_name,email`, 'get',
        ).then(res => {
          console.dir(res);
        })
          .catch(console.error);
      }
    })
  }

  private handleError(err: any) {
    console.error(err)
  }

}
