import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WTimeDialogComponent } from './w-time-dialog/w-time-dialog.component';
import { ITime } from './w-clock/w-clock.component';

@Injectable()
export class MatTimePickerService {

	userTime: ITime;
	userTimeChange: EventEmitter<ITime> = new EventEmitter();
	color: string = "accent";

	constructor(private dialog: MatDialog) { 
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

    public showPicker() {

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

        return dialogRef.afterClosed();
    }

    public emituserTimeChange() {

        this.userTimeChange.emit(this.userTime);
    }
}