import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IEvent, IUser } from '../../interfaces/';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHelpersService } from './http-helpers.service';
import { EnvVariables } from '../../environment/variables.token';
import { IEnvironmentVariables } from '../../environment/';

@Injectable()
export class ApiService {

  baseOpts: RequestOptions = null;
  authOpts: RequestOptions = null;

  constructor(
    private http: Http,
    private helpersSvc: HttpHelpersService,
    @Inject(EnvVariables) private vars: IEnvironmentVariables,
  ) {
    this.baseOpts = this.helpersSvc.getBaseRequestOptions();
    this.authOpts = this.helpersSvc.getBaseRequestOptionsWithAuth();
  }

  public getEvents(): Promise<IEvent[]> {
    return this.getEventsJson().then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent[]);
    }).catch(this.handleError);
  }

  public getEventById(id: string): Promise<IEvent> {
    if (id === undefined) throw new Error(`Event id ${id} shouldn't be undefined `);
    return this.getEventByIdJson(id).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent);
    }).catch(this.handleError);
  }

  public deleteEventById(id: string): Promise<boolean> {
    if (id === undefined) throw new Error(`Event id ${id} shouldn't be undefined `);
    return this.deleteEventByIdJson(id).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.operationStatus.toLowerCase().indexOf('removed') !== -1);
    }).catch(this.handleError);
  }

  public createEvent(event: IEvent): Promise<IEvent> {
    return this.createEventJson(event).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent);
    }).catch(this.handleError);
  }

  public changeEventById(id: string, newEvent: IEvent): Promise<IEvent> {
    if (id === undefined) throw new Error(`Event id ${id} shouldn't be undefined `);
    return this.changeEventByIdJson(id, newEvent).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent);
    }).catch(this.handleError);
  }

  public patchEventById(id: string, newEvent: IEvent): Promise<IEvent> {
    if (id === undefined) throw new Error(`Event id ${id} shouldn't be undefined `);
    return this.patchEventByIdJson(id, newEvent).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent);
    }).catch(this.handleError);
  }

  public getUsers(): Promise<IUser[]> {
    return this.getUsersJson().then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser[]);
    }).catch(this.handleError);
  }

  public getUserById(id: string): Promise<IUser> {
    if (id === undefined) throw new Error(`Event id ${id} shouldn't be undefined `);
    return this.getUserByIdJson(id).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser);
    }).catch(this.handleError);
  }

  public deleteUserById(id: string): Promise<boolean> {
    if (id === undefined) throw new Error(`Event id ${id} shouldn't be undefined `);
    return this.deleteUserByIdJson(id).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.operationStatus.toLowerCase().indexOf('removed') !== -1);
    }).catch(this.handleError);
  }

  public createUser(user: IUser | string): Promise<IUser & {[token: string]: any}> {
    return this.createUserJson(user).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser & {[token: string]: any});
    }).catch(this.handleError);
  }

  public cangeUserById(id: string, newUser: IUser): Promise<IUser> {
    if (id === undefined) throw new Error(`Event id ${id} shouldn't be undefined `);
    return this.changeUserByIdJson(id, newUser).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser);
    }).catch(this.handleError);
  }

  public patchUserById(id: string, newUser: IUser): Promise<IUser> {
    if (id === undefined) throw new Error(`Event id ${id} shouldn't be undefined `);
    return this.patchUserByIdJson(id, newUser).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser);
    }).catch(this.handleError);
  }

  /**
  * Private methods for http crud calls to server wrapping actual server responce object 
  */
  private getEventsJson(): Promise<{ operationStatus: string, data?: IEvent[], err?: string }> {
    return this.http.get(`${this.vars.eventsUrl}`, this.baseOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private getEventByIdJson(id: string): Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    return this.http.get(`${this.vars.eventsUrl}/${id}`, this.baseOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private deleteEventByIdJson(id: string): Promise<{ operationStatus: string, err?: string }> {
    return this.http.delete(`${this.vars.eventsUrl}/${id}`, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private createEventJson(event: IEvent)
    : Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    return this.http.post(`${this.vars.eventsUrl}`, event, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private changeEventByIdJson(id: string, newEvent: IEvent)
    : Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    return this.http.put(`${this.vars.eventsUrl}/${id}`, newEvent, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private patchEventByIdJson(id: string, newEvent: IEvent)
    : Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    return this.http.patch(`${this.vars.eventsUrl}/${id}`, newEvent, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }

  private getUsersJson(): Promise<{ operationStatus: string, data?: IUser[], err?: string }> {
    return this.http.get(`${this.vars.usersUrl}`, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private getUserByIdJson(id: string): Promise<{ operationStatus: string, data?: IUser, err?: string }> {
    return this.http.get(`${this.vars.usersUrl}/${id}`, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private deleteUserByIdJson(id: string): Promise<{ operationStatus: string, err?: string }> {
    return this.http.delete(`${this.vars.usersUrl}/${id}`, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private createUserJson(user: IUser | string)
    : Promise<{ operationStatus: string, data?: IUser | IUser & { [token: string]: any }, err?: string }> {
    return this.http.post(`${this.vars.usersUrl}`, user, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private changeUserByIdJson(id: string, newUser: IUser)
    : Promise<{ operationStatus: string, data?: IUser, err?: string }> {
    return this.http.put(`${this.vars.eventsUrl}/${id}`, newUser, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private patchUserByIdJson(id: string, newUser: IUser)
    : Promise<{ operationStatus: string, data?: IUser, err?: string }> {
    return this.http.patch(`${this.vars.usersUrl}/${id}`, newUser, this.authOpts)
      .map((resp: Response) => resp.json()).toPromise();
  }

  private handleError(error: Response | any) {
    let errMsg: string;               // enhance with remote logger
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(`Erorr in ApiService :: ${errMsg}`);
    return Promise.reject(errMsg);
  }
}
