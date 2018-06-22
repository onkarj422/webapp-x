import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../common/services/auth-guard.service';
import { AuthService } from '../common/services/auth.service';
import { CryptService } from '../common/services/crypt.service';
import { HttpService } from '../common/services/http.service';
import { SessionService } from '../common/services/session.service';
import { EventService } from '../common/services/event.service';
import { DataService } from '../common/services/data.service';
import { OrderService } from '../common/services/order.service';
import { TaskService } from '../common/services/task.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  ],
  declarations: []
})
export class CoreModule {
 
	constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        HttpService,
        SessionService,
        CryptService,
        AuthGuard,
        AuthService,
        EventService,
        DataService,
        OrderService,
        TaskService
      ]
    };
  }
}
