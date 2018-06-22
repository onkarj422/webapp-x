import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import {filter} from 'rxjs/operators';
import { EventService } from '../../common/services/event.service';
import { TaskService } from '../../common/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

	mobileDevice: boolean = true;
	@ViewChild('sidenav') sidenav;
  @ViewChild('matToolbar') matToolbar;
  @ViewChild('adminOutlet') adminOutlet;

  constructor(public media: ObservableMedia, private event: EventService, private task: TaskService) { 
  	this.mobileDevice = this.media.isActive('xs');
  }

  ngOnInit() {
    this.hideOnScroll();
  }

  runTaskJob() {
    this.task.runTaskJob();
  }

  hideOnScroll() {
    var prevScrollPos = window.pageYOffset;
    window.addEventListener('scroll', () => {
      var currScrollPos = window.pageYOffset;
      if  (prevScrollPos > currScrollPos) {
        this.event.hideOnScroll("0");
        this.matToolbar._elementRef.nativeElement.style.position = "relative";
        this.adminOutlet.nativeElement.style.top = "0";
        this.matToolbar._elementRef.nativeElement.style.zIndex = "0";
      } else {
        this.event.hideOnScroll("-64px");
        this.matToolbar._elementRef.nativeElement.style.position = "fixed";
        this.matToolbar._elementRef.nativeElement.style.zIndex = "9999";
        this.adminOutlet.nativeElement.style.position = "relative";
        this.adminOutlet.nativeElement.style.top = "64px";
      }
      prevScrollPos = currScrollPos;
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => {});
  }
}
