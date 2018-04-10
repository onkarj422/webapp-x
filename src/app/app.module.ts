import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './home/home.component'; 
import { LoginDialog } from './login-dialog';
import { AppCommonModule } from './common/common.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    AppCommonModule
  ],
  entryComponents: [
    LoginDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
