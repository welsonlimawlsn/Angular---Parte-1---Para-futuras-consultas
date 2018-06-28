import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './login/login.service';
import {Injectable, Injector} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService: LoginService = this.injector.get(LoginService);
    if (loginService.isLoggedIn()) {
      const authRequest = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${loginService.user.accessToken}`
        }
      });
      return next.handle(authRequest);
    }
    return next.handle(req);
  }
}
