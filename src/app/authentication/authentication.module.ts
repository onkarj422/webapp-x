import { NgModule } from '@angular/core';
import { AppCommonModule } from '../common/common.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    AppCommonModule
  ],
  declarations: [
  	LoginComponent, 
  	RegisterComponent
  ],
  exports: [
  	LoginComponent, 
  	RegisterComponent
  ]
})
export class AuthenticationModule { }
