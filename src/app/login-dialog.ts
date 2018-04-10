import { Component, Inject, ViewChild } from '@angular/core';
import { MdcDialogRef, MdcDialogComponent } from '@angular-mdc/web';

@Component({
  template: `
  <mdc-dialog *ngIf="!register">
    <mdc-dialog-header custom custom-background="#222d32">
			<mdc-dialog-header-title class="center-title" custom custom-text-color="#FFFFFF">
				SIGN IN
			</mdc-dialog-header-title>
    </mdc-dialog-header>
    <mdc-dialog-body>
			<app-login #applogin></app-login>
    </mdc-dialog-body>
    <mdc-dialog-footer fxLayoutGap="5px" custom custom-background="#222d32">
      <button mdc-dialog-button (click)="applogin.login()" [accept]="applogin.loginForm.valid" mdc-button raised="true" dense="true" secondary="true">LOGIN</button>
      <button mdc-dialog-button (click)="register=true" mdc-button raised="true" dense="true" secondary="true">REGISTER</button>
    </mdc-dialog-footer>
  </mdc-dialog>

  <mdc-dialog *ngIf="register">
    <mdc-dialog-header custom custom-background="#222d32">
      <mdc-dialog-header-title class="center-title" custom custom-text-color="#FFFFFF">
        REGISTER
      </mdc-dialog-header-title>
    </mdc-dialog-header>
    <mdc-dialog-body>
      <app-register #appregister></app-register>
    </mdc-dialog-body>
    <mdc-dialog-footer fxLayoutGap="5px" custom custom-background="#222d32">
      <button mdc-dialog-button *ngIf="appregister.currentStepIndex !== appregister.stepLength - 1" mdc-button (click)="appregister.stepper.next()" raised="true" dense="true" secondary="true">NEXT</button>
      <button mdc-dialog-button [accept]="appregister.registerForm.valid" *ngIf="appregister.currentStepIndex === appregister.stepLength - 1" mdc-button (click)="appregister.register()" raised="true" dense="true" secondary="true">REGISTER</button>
    </mdc-dialog-footer>
  </mdc-dialog>
  `,
  styles: [`
    .center-title {
      position: relative;
      top: 30%;
      transform: translateY(-30%);
    }
    `
  ]
})
export class LoginDialog {

  @ViewChild('appregister') appregister;

  register: boolean = false;

  constructor(public dialogRef: MdcDialogRef<LoginDialog>) { }

}
