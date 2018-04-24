import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { WebStorageModule } from "h5webstorage";
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './home/home.component';
import { AppCommonModule } from './common/common.module';
import { LoginDialog } from './login-dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthenticationModule,
    AppCommonModule,
    WebStorageModule.forRoot()
  ],
  entryComponents: [
    LoginDialog
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }