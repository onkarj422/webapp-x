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
export class ApploadModule { 

  constructor(private session: SessionService) {}

}

export function sessionInit(session: SessionService) {
  console.log("App is loading");
}
