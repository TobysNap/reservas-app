import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CalendarEvent } from 'angular-calendar';
import { StorageService } from './storage.service';
import { Subject } from "rxjs";

export interface EventsState {
  events: CalendarEvent[];
  loaded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private ss = inject(StorageService);
  private state = signal<EventsState>({
    events: [],
    loaded: false,
  });

  events = computed(() => this.state().events);
  loaded = computed(() => this.state().loaded);

  private eventsLoaded$ = this.ss.events$;
  add$ = new Subject<CalendarEvent>();
  delete$ = new Subject<number>();
  edit$ = new Subject<CalendarEvent>();

  constructor() {
    this.eventsLoaded$.pipe(takeUntilDestroyed()).subscribe((events) => {
      this.state.update((state) => ({
        ...state,
        events,
        loaded: true,
      }));
    });

    this.add$.pipe(takeUntilDestroyed()).subscribe((event) => {
      this.ss.addEvent(event);
    });

    this.delete$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.ss.deleteEvent(id);
    })

    this.edit$.pipe(takeUntilDestroyed()).subscribe((event) => { 
      this.ss.editEvent(event);
    })
  }
}
