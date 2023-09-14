import { Component, inject } from '@angular/core';
import { EventsService } from "./data-access/events.service";

@Component({
  selector: 'app-events',
  template: `
    <app-events-list
      [events]="events()"
    >
    </app-events-list>
  `,
  styles: [
  ]
})
export class EventsComponent {
  es = inject(EventsService);
  
  events = this.es.events;
}
