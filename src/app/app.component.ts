import { Component, ViewEncapsulation, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MdcDialog } from '@angular-mdc/web';
import { LoginDialog } from './login-dialog';
import { EventService } from './common/services/event.service';
import { SessionService } from './common/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

	@ViewChild('appbar') public appbar;
	@ViewChild('outlet') public outlet;
	isLoggedIn: boolean = false;
  
	constructor(
		private dialog: MdcDialog,
		private event: EventService, 
		public media: ObservableMedia,
		private session: SessionService) {
		
	}

	ngOnInit() {
		this.session.checkLogin().subscribe(isLoggedIn => {
			if (!isLoggedIn) {
				this.isLoggedIn = false;
			} else {
				this.isLoggedIn = true;	
			}
		});
	}

	ngAfterViewInit() {
		this.event.event.asObservable().subscribe(scroll => {
			this.appbar.elementRef.nativeElement.style.top = scroll;
			if (scroll == "-64px") {
				this.outlet.nativeElement.style.paddingTop = "0px";
			} else {
				this.outlet.nativeElement.style.paddingTop = "64px";
			}
		});
	}

	openLogin() {
		const dialogRef = this.dialog.open(LoginDialog, {
			escapeToClose: true,
			clickOutsideToClose: true
		});
	}

	signOut() {
		this.session.end();
	}

	apiCall() {
		return;
	}
}
