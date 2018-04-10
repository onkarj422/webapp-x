import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[custom]'
})
export class CustomDirective implements AfterViewInit {

	@Input('custom-background') backgroundColor: string;
	@Input('custom-text-color') textColor: string;
	@Input('custom-width') width: string;
	@Input('custom-height') height: string;
  @Input('custom-opacity') opacity: string;

  constructor(private el: ElementRef) { 

  }

  ngAfterViewInit(): void {
  	this.el.nativeElement.style.backgroundColor = this.backgroundColor;
  	this.el.nativeElement.style.color = this.textColor;
  	this.el.nativeElement.style.width = this.width;
  	this.el.nativeElement.style.height = this.height;
    this.el.nativeElement.style.opacity = this.opacity;
  }
}
