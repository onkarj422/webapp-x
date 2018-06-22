import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CryptService } from './crypt.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public isActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private session: SessionService, private router: Router, private crypt: CryptService) {

	}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    let obs = this.session.isLoggedIn.asObservable();
    return obs.pipe(switchMap(
      isLoggedIn => {
        if (isLoggedIn) {
          if (this.check(url, this.session.userRoleId) == false) {
            this.router.navigateByUrl(this.session.navigate());
          }
          return new BehaviorSubject<boolean>(this.check(url, this.session.userRoleId)).asObservable();
        } else {
          return new BehaviorSubject<boolean>(false).asObservable();
        }
      }
    ));
  }

  check(stateUrl: string, userRoleId: number): boolean {
    let admin = stateUrl.match(/admin/g);
    let customer = stateUrl.match(/customer/g);
    let chief = stateUrl.match(/food/g);
    let delivery = stateUrl.match(/delivery/g);
    if (admin != null && userRoleId == 1) {
      return true;
    } else if (admin == null && chief == null && delivery == null && userRoleId == 2) {
      return true;
    } else if (delivery != null && userRoleId == 3) {
      return true;
    } else if (chief != null && userRoleId == 4) {
      return true;
    } else {
      return false;
    }
  }
}
