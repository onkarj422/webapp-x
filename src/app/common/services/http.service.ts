import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { ICustomer } from '../interfaces/customer';

@Injectable()
export class HttpService {

	postURL: string = "./api/";
  getURL: string = "./api/";
	registerURL: string = "register";
	loginURL: string = "login";
	accessURL: string = "access";
	headers_urlEnc = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded");
  headers_frmDta = new HttpHeaders().set("Content-Type","multipart/form-data");

  constructor(private http: HttpClient) { 
  
  }

  post(data: any, url: string): Observable<any> {
    return this.http
      .post(
        this.postURL+url, 
        data, 
        { 
          headers: this.headers_urlEnc, 
          responseType: 'json'
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  getData(data: string): Observable<any> {
    return this.http
      .get(
        this.getURL+data
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
      console.error(error.error.text);
      let errTxt = error.error.text;
      if (errTxt.slice(-4) == 'null') {
        console.error("Received empty data array from the backend!");
      }
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong,
	  }
	  // return an ErrorObservable with a user-facing error message
	  return throwError(error.error.text);
		};
}
