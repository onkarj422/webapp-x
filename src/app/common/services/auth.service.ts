import { Injectable, Injector } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  loginResult: any;

	constructor(private apiService: HttpService) {

	}

	login(data) {
    return new Promise((resolve,reject) => {
      this.apiService.post(data, "login").subscribe(
        data => {
          resolve(data);
        },
        error => {
          console.log(error);
          reject();
        }
      )
    });
  } 

  register(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post(data, "register").subscribe(
        data => {
          resolve(data);
        },
        error => {
          console.log(error);
          reject();
        }
      )
    });
  }
}