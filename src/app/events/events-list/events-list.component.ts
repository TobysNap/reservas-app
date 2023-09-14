import { Component } from '@angular/core';
import { CalendarView } from "angular-calendar";

@Component({
  selector: 'app-events-list',
  template: `
    <mwl-calendar-month-view
      [viewDate]="viewDate"
    >
    </mwl-calendar-month-view>
  `,
  styles: [
  ]
})
export class EventsListComponent {
  view = CalendarView.Month;
  viewDate = new Date();

}
