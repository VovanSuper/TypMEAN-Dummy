// let hostUrl = `${app.API_HOST}:${app.API_PORT}` || '//localhost:8080';
let hostUrl = '//localhost:8080';
let fbAppId = '1825033960857449';

export const Variables = {
  eventsUrl         : `${hostUrl}/events`,
  usersUrl          : `${hostUrl}/users`,
  loginUrl          : `${hostUrl}/login`,
  authUrl           : `${hostUrl}/auth`,
  authFbUrl         : `${hostUrl}/auth/facebook`,
  forgotPasswordUrl : `${hostUrl}/forgotpassword`
}
