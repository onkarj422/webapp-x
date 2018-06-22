import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng4-validators';
import { MdcModule } from './modules/mdc.module';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CustomDirective } from './directives/custom.directive';
import { DividerComponent } from './components/divider.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialTimeControlModule } from './modules/material-time-control/material-time-control.module';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdcModule,
    FlexLayoutModule,
    AngularMaterialModule,
    HttpClientModule,
    MaterialTimeControlModule
  ],
  exports: [
  	CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdcModule,
    FlexLayoutModule,
    AngularMaterialModule,
    CustomDirective,
    DividerComponent,
    MaterialTimeControlModule,
    AmazingTimePickerModule
  ],
  declarations: [
    CustomDirective, 
    DividerComponent
  ],
  providers: [
    
  ]
})
export class AppCommonModule { }
