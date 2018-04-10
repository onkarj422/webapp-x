import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { 

  }

  getApi() {
  	return this.http.get("./api/");
  }
}
