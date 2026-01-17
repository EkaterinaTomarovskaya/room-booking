import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


export const timeRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('startTime')?.value;
    const end = control.get('endTime')?.value;
    if (start && end) {
        const [h1, m1] = start.split(':').map(Number);
        const [h2, m2] = end.split(':').map(Number);
        return (h2 * 60 + m2) > (h1 * 60 + m1) ? null : { timeInvalid: true };
    }
    return null;
};

@Component({
    selector: 'app-booking-dialog',
    standalone: true,
    imports: [
        CommonModule, MatDialogModule, ReactiveFormsModule, MatIconModule,
        MatButtonModule, MatDatepickerModule, MatFormFieldModule,
        MatInputModule, MatNativeDateModule, MatAutocompleteModule
    ],
    templateUrl: './BookingDialog.html',
    styleUrl: './BookingDialog.scss'
})
export class BookingDialogComponent {
    public data = inject(MAT_DIALOG_DATA);
    private dialogRef = inject(MatDialogRef<BookingDialogComponent>);
    public minDate: Date = new Date();

    hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    minutes = ['00', '15', '30', '45'];

    form = new FormGroup({
        date: new FormControl(new Date(), [Validators.required]),
        startHour: new FormControl('09', [Validators.required]),
        startMinute: new FormControl('00', [Validators.required]),
        endHour: new FormControl('10', [Validators.required]),
        endMinute: new FormControl('00', [Validators.required])
    }, { validators: this.internalTimeValidator.bind(this) });

    private internalTimeValidator(control: AbstractControl): ValidationErrors | null {
        const h1 = +control.get('startHour')?.value;
        const m1 = +control.get('startMinute')?.value;
        const h2 = +control.get('endHour')?.value;
        const m2 = +control.get('endMinute')?.value;

        const startTotal = h1 * 60 + m1;
        const endTotal = h2 * 60 + m2;

        if (isNaN(startTotal) || isNaN(endTotal)) return { timeInvalid: true };
        return (endTotal > startTotal && h1 < 24 && m1 < 60 && h2 < 24 && m2 < 60)
            ? null : { timeInvalid: true };
    }

    onCancel() { this.dialogRef.close(); }
    onConfirm() {
        if (this.form.valid) {
            const val = this.form.value;
            this.dialogRef.close({
                date: val.date,
                startTime: `${val.startHour}:${val.startMinute}`,
                endTime: `${val.endHour}:${val.endMinute}`
            });
        }
    }
}