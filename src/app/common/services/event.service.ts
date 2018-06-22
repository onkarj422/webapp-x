import { Injectable, EventEmitter, ViewChild } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class EventService {

	public event = new Subject<any>();
	public onScroll = this.event.asObservable();

  constructor() { 
  	
  }

  hideOnScroll(scrollEvent: string) {
  	this.event.next(scrollEvent);
  }

}
