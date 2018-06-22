import { Directive, ViewContainerRef, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { WTimeDialogComponent } from './w-time-dialog/w-time-dialog.component';
import { ITime } from './w-clock/w-clock.component';

@Directive({
	selector: 'input[mat-time-picker]',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: MatTimePickerDirective,
		multi: true
	}]
})
export class MatTimePickerDirective implements ControlValueAccessor {

	@Output() myClick = new EventEmitter();
	@Input() userTime: ITime;
	@Output() userTimeChange: EventEmitter<ITime> = new EventEmitter();
	color: string = "accent";
	private elementRef: ElementRef;
	private onChange = (x: any): void => {};
	constructor(
		public viewContainerRef: ViewContainerRef,
		private dialog: MatDialog
	) {
		this.elementRef = this.viewContainerRef.element;
		if (!this.userTime) {

            this.userTime = {

                hour: 10,
                minute: 25,
                meriden: 'PM',
                format: 12
            }
        }
	}

	public get time(): string {

        if (!this.userTime) {
            return '';
        }

        let meriden = `${this.userTime.meriden}`;
        if (this.userTime.format === 24) {
            meriden = '';
        }

        let hour = `${this.userTime.hour}`;
        if (this.userTime.hour === 24) {
            hour = '00';
        }

        if (this.userTime.minute === 0) {
            return `${hour}:00 ${meriden}`;

        } else if (this.userTime.minute < 10) {

            const tt = '0' + String(this.userTime.minute);
            return `${hour}:${tt} ${meriden}`;

        } else {
            return `${hour}:${this.userTime.minute} ${meriden}`;
        }
    }

    public showPicker($event) {

        const dialogRef = this.dialog.open(WTimeDialogComponent, {

            data: {
                time: {
                    hour: this.userTime.hour,
                    minute: this.userTime.minute,
                    meriden: this.userTime.meriden,
                    format: this.userTime.format
                },
                color: this.color
            }
        });

        return dialogRef.afterClosed()
        	.subscribe((result: ITime | -1) => {

                // result will be update userTime object or -1 or undefined (closed dialog w/o clicking cancel)
                if (result === undefined) {
                    return;
                } else if (result !== -1) {
                		this.userTime = result;
                    this.emituserTimeChange();
                    console.log(this.time);
                    this.writeValue(this.time);
                    this.onChange(this.time);
                }
            });
    }

    public emituserTimeChange() {

        this.userTimeChange.emit(this.userTime);
    }
 
	@HostListener('click', ['$event'])
	onClick(e) {
		const ele = this.viewContainerRef.element.nativeElement;
		this.showPicker(e);
	}

	writeValue(value: any) {
    if (this.elementRef) {
      this.elementRef.nativeElement.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {  }
}
