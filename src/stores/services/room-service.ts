import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../models/room-model';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private roomsData: Room[] = [];

    private rooms$ = new BehaviorSubject<Room[]>(this.roomsData);

    getRooms(): Observable<Room[]> {
        return this.rooms$.asObservable();
    }

    toggleBooking(id: number): void {
        this.roomsData = this.roomsData.map(room =>
            room.id === id ? { ...room, isAvailable: !room.isAvailable } : room
        );
        this.rooms$.next(this.roomsData);
    }
}