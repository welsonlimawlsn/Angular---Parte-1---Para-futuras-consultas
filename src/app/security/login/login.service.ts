import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MEAT_API} from '../../app.api';
import {User} from './user.model';
import {NavigationEnd, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';

@Injectable()
export class LoginService {

  user: User;
  lastUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.lastUrl = event.url);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`, {
      email: email,
      password: password
    }).pipe(tap(user => this.user = user));
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  handleLogin(path = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }

  logout() {
    this.user = undefined;
  }
}
