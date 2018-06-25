import {NgModule} from '@angular/core';
import {AboutComponent} from './about.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './about.routes';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class AboutModule {

}
