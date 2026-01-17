import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { switchMap, filter, map } from 'rxjs';
import { RoomStore } from '@stores/store';
import { timeRangeValidator } from '../../components/BookingDialog/BookingDialog';

@Component({
    selector: 'app-room-details-screen',
    standalone: true,
    imports: [
        CommonModule, RouterModule, ReactiveFormsModule,
        MatButtonModule, MatIconModule, MatDatepickerModule,
        MatFormFieldModule, MatInputModule, MatNativeDateModule
    ],
    templateUrl: './RoomDetailsScreen.html',
    styleUrl: './RoomDetailsScreen.scss'
})
export class RoomDetailsScreen {
    private route = inject(ActivatedRoute);
    private store = inject(RoomStore);
    private router = inject(Router);

    room$ = this.route.paramMap.pipe(
        map(params => params.get('id')),
        filter((id): id is string => !!id),
        switchMap(id => this.store.getRoomById(id))
    );

    // Форма с валидацией времени
    bookingForm = new FormGroup({
        date: new FormControl(new Date(), [Validators.required]),
        startTime: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required])
    }, { validators: timeRangeValidator });

    onBook(roomId: string) {
        if (this.bookingForm.valid) {
            this.store.bookRoom(roomId, this.bookingForm.value);
            this.router.navigate(['/rooms']);
        }
    }

    getFeatureName(feat: string): string {
        const names: Record<string, string> = {
            wifi: 'Wi-Fi 100 Мбит/с',
            ac_unit: 'Климат-контроль',
            coffee_maker: 'Кофе-машина',
            tv: 'Smart TV',
            videocam: 'Камера для конф-колла',
            groups: 'Для команд',
            laptop: 'Рабочее место',
            filter_drama: 'Вид на город',
            visibility: 'Конфиденциальность',
            eco: 'Эко-дизайн',
            settings_input_component: '4K Проектор',
            self_improvement: 'Зона тишины',
            spa: 'Релакс-зона',
            architecture: 'Чертежный стол',
            smart_toy: 'Игровая консоль',
            rocket: 'Startup vibe'
        };
        return names[feat] || feat;
    }
}