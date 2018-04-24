import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SessionService } from './common/services/session.service';

@NgModule({
  providers: [
  		SessionService,
  		{
  			provide: APP_INITIALIZER, 
  			useFactory: sessionInit, 
  			deps: [
  				SessionService
  			],
  			multi: false
  		}
  ]
})
export class ApploadModule { }

export function sessionInit(session: SessionService) {
  session.sessionServiceInit();
}
