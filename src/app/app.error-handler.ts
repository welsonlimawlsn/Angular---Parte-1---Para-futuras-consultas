import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {NotificationService} from './shared/messages/notification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginService} from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(
    private notificationService: NotificationService,
    private injector: Injector,
    private zone: NgZone) {
    super();
  }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      const message = error.error.message;
      this.zone.run(() => {
        switch (error.status) {
          case 401:
            this.injector.get(LoginService).handleLogin();
            this.notificationService.nofify('Você precisa se autenticar!');
            break;
          case 403:
            this.notificationService.nofify(message || 'Não autorizado');
            break;
          case 404:
            this.notificationService.nofify(message || 'Recurso não encontrado. Verifique o console para mais detalhes')
            break;
        }
      });
    }
    super.handleError(error);
  }
}

