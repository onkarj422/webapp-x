import { Component, ViewEncapsulation } from '@angular/core';
import { MdcDialog } from '@angular-mdc/web';
import { LoginDialog } from './login-dialog';
import { HttpService } from './common/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  
	constructor(private dialog: MdcDialog, private api: HttpService) { }

	openLogin() {
		const dialogRef = this.dialog.open(LoginDialog, {
			escapeToClose: true,
			clickOutsideToClose: true
		});
	}

	apiCall() {
		return;
	}
}
