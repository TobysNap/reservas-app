import { state } from '@angular/animations';
import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CalendarEvent } from 'angular-calendar';
import { Subject, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  events = signal<CalendarEvent[]>([
    {
      id: 1,
      start: new Date(),
      title: 'Event 1',
    },
    {
      id: 2,
      start: new Date(),
      title: 'Event 2',
    },
  ]);

  add$ = new Subject<CalendarEvent>();
  remove$ = new Subject<number | string>();
  edit$ = new Subject<CalendarEvent>();

  constructor() {
    this.add$.pipe(takeUntilDestroyed()).subscribe((event) => {
      this.addEvent(event);
    });

    this.edit$.pipe(takeUntilDestroyed()).subscribe((event) => {
      this.editEvent(event);
    })

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.deleteEvent(id);
    })
  }

  private addEvent(event: CalendarEvent) {
    this.events.update((state) => [...state, event]);
  }

  private deleteEvent(id: number | string) {
    this.events.update((state) => state.filter((e) => e.id !== id));
  }

  private editEvent(updatedEvent: CalendarEvent) {
    this.events.update((state) => {
      const i = state.findIndex((e) => e.id === updatedEvent.id);
      if (i !== -1) {
        const updatedState = [...state];
        updatedState[i] = updatedEvent;
        return updatedState;
      }
      return state;
    });
  }
  
}
