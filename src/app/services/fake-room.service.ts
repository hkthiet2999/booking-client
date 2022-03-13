import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeRoomService {
  constructor() {}

  roomList = [
    {
      id: '8dfa00b9-0cb6-4a86-949e-80961dd050a6',
      codeName: 'ABC001',
      isVacant: true,
      size: 'double',
      price: 1234,
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ],
    },
    {
      id: '20b7017c-b185-41b4-9c6c-73e028efc9cb',
      codeName: 'ABC002',
      isVacant: true,
      size: 'double',
      price: 1234,
    },
    {
      id: '21b7017c-b185-41b4-9c6c-73e028efc9cb',
      codeName: 'ABC003',
      isVacant: true,
      size: 'double',
      price: 1234,
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ],
    },
    {
      id: '22b7017c-b185-41b4-9c6c-73e028efc9cb',
      codeName: 'ABC004',
      isVacant: true,
      size: 'double',
      price: 1234,
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ],
    },
    {
      id: '23b7017c-b185-41b4-9c6c-73e028efc9cb',
      codeName: 'ABC005',
      isVacant: true,
      size: 'double',
      price: 1234,
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ],
    },
    {
      id: '20b7017c-b185-41b4-9c6c-73e028efc9cb',
      codeName: 'ABC006',
      isVacant: true,
      size: 'double',
      price: 1234,
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ],
    },
  ];
}
