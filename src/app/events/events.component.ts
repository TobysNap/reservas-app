import { Component, computed, inject } from '@angular/core';
import { CalendarEvent } from "angular-calendar";
import { StorageService } from "./data-access/storage.service";

@Component({
  selector: 'app-events',
  template: `
    <app-events-list
      [events]="ss.events()"
    >
    </app-events-list>
    <app-form
      (save)="handleSubmit($event)"
    >
    </app-form>
  `,
  styles: [
  ]
})
export class EventsComponent {
  ss = inject(StorageService);
  
  handleSubmit(event: CalendarEvent) {
    const { start, title } = event;
    const newEvent: CalendarEvent = {
      id: Math.random(),
      start: new Date(start),
      title: title,
    }
    this.ss.add$.next(newEvent);
  }
}
