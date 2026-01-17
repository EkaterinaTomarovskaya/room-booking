import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RoomStore, Room } from '@stores/store';
import { PillButtonComponent } from '@components/PillButton/PillButton';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingDialogComponent } from '../../components/BookingDialog/BookingDialog';


@Component({
  selector: 'app-rooms-list-screen',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    PillButtonComponent,
    MatIconModule
  ],
  templateUrl: './RoomListScreen.html',
  styleUrl: './RoomListScreen.scss'
})
export class RoomsListScreen {
  private store = inject(RoomStore);
  private dialog = inject(MatDialog);

  rooms$ = this.store.rooms$;

  onToggleRoom(room: Room, event: MouseEvent | any) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    if (!room.isAvailable) {
      this.store.toggleBooking(room.id);
      return;
    }

    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '400px',
      data: { roomName: room.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.bookRoom(room.id, result);
      }
    });
  }
}