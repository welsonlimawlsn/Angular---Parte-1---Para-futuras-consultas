import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

export class ErrorHandler {
  static handleError(error: Response | any): ErrorObservable<string> {
    let errorMessage: string;
    if (error instanceof Response) {
      errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`;
    } else {
      errorMessage = error.toString();
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
