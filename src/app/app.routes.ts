import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'rooms',
        pathMatch: 'full'
    },
    {
        path: 'rooms',
        title: 'Список комнат',
        loadComponent: () =>
            import('@screens/RoomList/RoomListScreen').then(m => m.RoomsListScreen)
    },
    {
        path: 'rooms/:id',
        title: 'Детали комнаты',
        loadComponent: () =>
            import('@screens/RoomDetails/RoomDetailsScreen').then(m => m.RoomDetailsScreen)
    },
    //   // Страница ошибки (Wildcard route)
    //   {
    //     path: '**',
    //     title: 'Страница не найдена',
    //     loadComponent: () => 
    //       import('@screens/Error/ErrorScreen').then(m => m.ErrorScreen) // Проверь путь к своей ErrorScreen
    //   }
];