import {Routes} from '@angular/router';
import {OrderComponent} from './order.component';
import {LeaveOrderGuard} from './leave-order.guard';

export const ROUTES: Routes = [
  {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
];
