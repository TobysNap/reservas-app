import { Injectable } from '@angular/core';
import { CalendarEvent } from "angular-calendar";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  events: CalendarEvent[] = [
    {
      id: 1,
      start: new Date(),
      title: 'Event 1',
    },
    {
      id: 2,
      start: new Date(),
      title: 'Event 2',
    }
  ];

  events$ = of(this.events);

  constructor() { }

  addEvent(event: CalendarEvent) {
    this.events.push(event);
  }

  deleteEvent(id: number | string) {
    this.events = this.events.filter(e => e.id !== id);
  }

  editEvent(updatedEvent: CalendarEvent) {
    this.events = this.events.map(e => e.id === updatedEvent.id ? updatedEvent : e );
  }

}
