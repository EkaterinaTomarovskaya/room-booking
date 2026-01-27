import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PillButtonComponent } from '@components/PillButton/pill-button';
import { Room } from '@stores/store';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-room-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        PillButtonComponent,
        RouterModule
    ],
    templateUrl: './room-card.html',
    styleUrl: './room-card.scss'
})
export class RoomCardComponent {
    @Input({ required: true }) room!: Room;
    @Output() toggle = new EventEmitter<string>();
}