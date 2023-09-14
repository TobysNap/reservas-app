import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { CalendarEvent } from "angular-calendar";

fdescribe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add event', () => {
    const initialLength = service.events.length;
    const event: CalendarEvent = {
      start: new Date(),
      title: 'Test Event'
    };

    service.addEvent(event);

    expect(service.events.length).toBeGreaterThan(initialLength);
    expect(service.events).toEqual(jasmine.arrayContaining([event]));
  });

  it('should edit event', () => {
    const event: CalendarEvent = {
      id: 2,
      start: new Date(),
      title: 'Test Event'
    };

    service.editEvent(event);

    expect(service.events).toEqual(jasmine.arrayContaining([event]));
  });

  it('should delete event', () => {
    const initialLength = service.events.length;

    service.deleteEvent(2);

    expect(service.events.length).toBeLessThan(initialLength);
  });
});
