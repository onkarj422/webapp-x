import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap } from 'rxjs/operators';
import { ICustomer } from '../interfaces/customer';

@Injectable()
export class HttpService {

	apiURL: string = "./api/";
	registerURL: string = "register";
	loginURL: string = "login";
	accessURL: string = "access";
	headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded");

  constructor(private http: HttpClient) { 
  
  }

  apiRegister(data): Observable<any> {
  	let headers = new HttpHeaders().set("Content-Type","multipart/form-data");
  	return this.http
  		.post(
  			this.apiURL+this.registerURL, 
  			data, 
  			{	
  				headers: this.headers, 
  				responseType: 'json'
  			}
  		)
  		.pipe(
  			catchError(this.handleError)
  		);
  }

  apiLogin(data): Observable<any> {
  	let headers = new HttpHeaders().set("Content-Type","multipart/form-data");
  	return this.http
  		.post(
  			this.apiURL+this.loginURL, 
  			data, 
  			{	
  				headers: this.headers, 
  				responseType: 'json'
  			}
  		)
  		.pipe(
  			catchError(this.handleError)
  		);
  }

  apiSessionInit(data): Observable<any> {
  	let headers = new HttpHeaders().set("Content-Type","multipart/form-data");
  	return this.http
  		.post(
  			this.apiURL+this.accessURL, 
  			data,
  			{	
  				headers: this.headers, 
  				responseType: 'json'
  			}
  		)
  		.pipe(
  			catchError(this.handleError)
  		);
  }

  getData(data: string): Observable<any> {
    return this.http
      .get<ICustomer[]>(
        this.apiURL+data
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
	    console.error('An error occurred:', error.error.message);
	  } else {
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong,
	    console.error(
	      `Backend returned code ${error.status}, ` +
	      `body was: ${error.error}`);
	  }
	  // return an ErrorObservable with a user-facing error message
	  return Observable.throw(error.statusText);
		};
}
