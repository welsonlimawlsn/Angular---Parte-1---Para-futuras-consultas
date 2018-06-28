import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './login/login.service';
import {Injectable} from '@angular/core';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanLoad');
    console.log(route);
    return this.checkAuthentication(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanActivate');
    console.log(route);
    console.log(state);
    return this.checkAuthentication(route.routeConfig.path);
  }

  private checkAuthentication(path: string) {
    let loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`);
    }
    return loggedIn;
  }

}
