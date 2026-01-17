import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface Room {
    id: string;
    name: string;
    capacity: number;
    features: string[];
    description: string;
    isAvailable: boolean;
    image: string;
    bookingPeriod?: string;
    bookedDate?: string;
}

@Injectable({ providedIn: 'root' })
export class RoomStore {
    private readonly STORAGE_KEY = 'room_booking_system_data';

    private loadInitialData(): Room[] {
        const savedData = localStorage.getItem(this.STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
        return [
            {
                id: '1',
                name: 'Переговорная',
                capacity: 16,
                isAvailable: true,
                image: 'assets/1.jpg',
                features:
                    ['wifi', 'ac_unit', 'coffee_maker', 'filter_drama'],
                description:
                    'Погрузитесь в атмосферу спокойствия в Переговорная. Это пространство спроектировано для тех, кто ценит тишину и эстетику минимализма. Мягкое освещение и панорамный вид на город создают идеальный фон для стратегического планирования или глубокой аналитической работы. Здесь вас ничего не будет отвлекать от принятия важных решений.'
            },
            {
                id: '2',
                name: 'Креативная зона',
                capacity: 8,
                isAvailable: true,
                image: 'assets/2.jpg',
                features: ['wifi', 'tv', 'groups', 'videocam'],
                description: 'Креативная зона — это мощь и масштаб. Центром комнаты является массивный стол из натурального дуба, за которым рождаются великие идеи. Зал полностью укомплектован для командных воркшопов: от профессиональной системы видеосвязи до огромной магнитно-маркерной доски. Высокие потолки и индустриальный стиль придают вашим встречам особый статус.'
            },
            {
                id: '3',
                name: 'Точка встреч',
                capacity: 20,
                isAvailable: true,
                image: 'assets/3.jpg',
                features: ['wifi', 'coffee_maker', 'laptop', 'visibility'],
                description: 'Точка встреч — наше самое интимное пространство, расположенное на верхнем уровне. Это идеальное место для интервью, частных консультаций или работы в режиме "тет-а-тет". Компактная, но эргономичная планировка позволяет чувствовать себя уютно, а отличная звукоизоляция гарантирует полную конфиденциальность ваших разговоров.'
            },
            {
                id: '4',
                name: 'Технологичный хаб',
                capacity: 12,
                isAvailable: true,
                image: 'assets/4.jpg',
                features: ['wifi', 'ac_unit', 'wb_sunny', 'eco'],
                description: 'Green Garden — это настоящий оазис посреди бетонных джунглей. Комната заполнена живыми тропическими растениями, которые не только очищают воздух, но и помогают снизить уровень стресса во время напряженных переговоров. Естественное освещение и мебель из экологичных материалов создают атмосферу свежести и креативности.'
            },
            {
                id: '5',
                name: 'Для интервью',
                capacity: 20,
                isAvailable: true,
                image: 'assets/5.jpg',
                features: ['wifi', 'videocam', 'tv', 'settings_input_component'],
                description: 'Добро пожаловать в будущее. Для интервью — это наша самая технологичная локация, созданная для IT-команд и диджитал-агентств. Умное освещение меняет температуру цвета в зависимости от времени суток, а 4K проектор позволяет проводить презентации кинематографического качества. Стены с шумопоглощающими панелями гарантируют, что ваш "брейншторм" останется секретом.'
            },
            {
                id: '6',
                name: 'Большой зал',
                capacity: 10,
                isAvailable: true,
                image: 'assets/6.jpg',
                features: ['wifi', 'self_improvement', 'coffee_maker', 'spa'],
                description: 'Большой зал создана для тех, кто ищет баланс между работой и внутренним спокойствием. Интерьер в японском стиле, минимум визуального шума и мягкие ковровые покрытия способствуют глубокому погружению в задачу. Здесь принято работать без обуви (по желанию) и соблюдать режим тишины. Идеально для работы над книгой или сложным кодом.'
            },
            {
                id: '7',
                name: 'Комната для стратегий',
                capacity: 15,
                isAvailable: true,
                image: 'assets/7.jpg',
                features: ['wifi', 'architecture', 'tv', 'groups'],
                description: 'Brick Workshop — это пространство с характером. Стены из старого кирпича и открытые коммуникации создают атмосферу мастерской. Большая рабочая поверхность позволяет комфортно разложить чертежи, макеты или крупногабаритные документы. Помещение популярно среди архитекторов, дизайнеров и проектных групп, которым нужно "пространство для маневра".'
            },
            {
                id: '8',
                name: 'Комната фокусировки',
                capacity: 20,
                isAvailable: true,
                image: 'assets/8.jpg',
                features: ['wifi', 'smart_toy', 'tv', 'rocket'],
                description: 'Комната фокусировки — площадка для самых дерзких стартапов. Яркая неоновая подсветка, неформальная мебель (кресла-мешки и высокие барные стулья) и игровая приставка для перерывов делают эту комнату любимым местом молодежных команд. Если вам нужно сбросить оковы офисного официоза и придумать что-то по-настоящему безумное — вам сюда.'
            }
        ]
    };
    private readonly _rooms = new BehaviorSubject<Room[]>(this.loadInitialData());
    readonly rooms$ = this._rooms.asObservable();

    private syncStorage(rooms: Room[]) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rooms));
    }

    toggleBooking(id: string) {
        const updated = this._rooms.value.map(room =>
            room.id === id ? { ...room, isAvailable: !room.isAvailable, bookingPeriod: undefined, bookedDate: undefined } : room
        );
        this._rooms.next(updated);
        this.syncStorage(updated);
    }

    bookRoom(id: string, bookingData: any) {
        const updated = this._rooms.value.map(room => {
            if (room.id === id) {
                const dateStr = bookingData.date instanceof Date ? bookingData.date.toLocaleDateString('ru-RU') : bookingData.date;
                return {
                    ...room,
                    isAvailable: false,
                    bookedDate: dateStr,
                    bookingPeriod: `${bookingData.startTime} — ${bookingData.endTime}`
                };
            }
            return room;
        });
        this._rooms.next(updated);
        this.syncStorage(updated);
    }

    getRoomById(id: string): Observable<Room | undefined> {
        return this.rooms$.pipe(map(rooms => rooms.find(r => r.id === id)));
    }
}