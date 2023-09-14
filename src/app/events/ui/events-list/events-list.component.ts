import { Component, Input } from '@angular/core';
import { CalendarEvent, CalendarView } from "angular-calendar";

@Component({
  selector: 'app-events-list',
  template: `
    <mwl-calendar-month-view
      [viewDate]="viewDate"
      [events]="events"
    >
    </mwl-calendar-month-view>
  `,
  styles: [
  ]
})
export class EventsListComponent {
  view = CalendarView.Month;
  viewDate = new Date();
  @Input() events!: CalendarEvent[];
}
