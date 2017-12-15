import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, UIResponse, AuthResponse, LoginStatus, LoginOptions } from 'ngx-facebook';

@Injectable()
export class FbQueriesService {

  constructor(private fb: FacebookService) {
    console.log('Initializing Facebook');
    fb.init({
      appId: '1825033960857449',
      version: 'v2.11',
      cookie: true
    });
  }

  login(): Promise<AuthResponse | void> {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'email,public_profile,user_friends,user_location,user_hometown,user_photos,user_actions.books,user_likes,user_birthday'
    };
    return this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        if (!res) throw new Error(`[fb-login.service->login()]:: No LoginResponse`);
        return res.authResponse;
      })
      .catch(this.handleError);
  }

  getProfile() {
    this.fb.getLoginStatus().then((logStatus: LoginStatus) => {
      let userId = logStatus.authResponse.userID || null;
      let accessToken = logStatus.authResponse.accessToken || null;
      if (userId) {
        this.fb.api(`${userId}?access_token=${accessToken}&fields=id,name,picture,cover,gender,first_name,last_name,birthday,email`, 'get',
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
