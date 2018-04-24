import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng4-validators';
import { MdcModule } from './component-library-modules/mdc.module';
import { AngularMaterialModule } from './component-library-modules/angular-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CustomDirective } from './directives/custom.directive';
import { DividerComponent } from './components/divider.component';
import { CryptService } from './services/crypt.service';
import { HttpService } from './services/http.service';
import { SessionService } from './services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardAdmin } from './services/auth-guard.service';
import { AuthGuardCustomer } from './services/auth-guard.service';
import { AuthGuardDeliveryMan } from './services/auth-guard.service';
import { AuthGuardChief } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdcModule,
    FlexLayoutModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
  	CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdcModule,
    FlexLayoutModule,
    AngularMaterialModule,
    CustomDirective,
    DividerComponent
  ],
  declarations: [
    CustomDirective, 
    DividerComponent
  ],
  providers: [
    HttpService,
    SessionService,
    CryptService,
    AuthGuardAdmin,
    AuthGuardCustomer,
    AuthGuardDeliveryMan,
    AuthGuardChief,
    AuthService
  ]
})
export class AppCommonModule { }
