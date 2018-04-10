import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng4-validators';
import { StorageModule } from '@cedx/ngx-webstorage';
import { MdcModule } from './component-library-modules/mdc.module';
import { AngularMaterialModule } from './component-library-modules/angular-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CustomDirective } from './directives/custom.directive';
import { DividerComponent } from './components/divider.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StorageModule,
    MdcModule,
    FlexLayoutModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [
  	CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StorageModule,
    MdcModule,
    FlexLayoutModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    CustomDirective,
    DividerComponent
  ],
  declarations: [CustomDirective, DividerComponent],
  providers: [HttpService]
})
export class AppCommonModule { }
