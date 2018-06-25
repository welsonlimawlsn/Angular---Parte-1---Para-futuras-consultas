import {EventEmitter} from '@angular/core';

export class NotificationService {

  notifier = new EventEmitter<string>();

  nofify(message: string): void {
    this.notifier.emit(message);
  }
}
