import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pill-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pill-button.html',
    styleUrl: './pill-button.scss'
})
export class PillButtonComponent {
    @Input() color: string = '#6200ee';
    @Output() btnClick = new EventEmitter<void>();
    @Input() variant: 'success' | 'danger' | 'default' = 'default';
}