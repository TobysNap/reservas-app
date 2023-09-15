import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="eventForm" (ngSubmit)="onSubmit()" class="flex justify-around items-center bg-white">
      <div class="flex flex-col">
        <label for="start" class="mb-2 text-sm font-medium text-gray-900">Fecha de inicio</label>
        <input
          type="date"
          id="start"
          formControlName="start"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="title" class="mb-2 text-sm font-medium text-gray-900">Titulo</label>
        <input
          type="text"
          id="title"
          formControlName="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
          placeholder="Titulo del evento..."
          required
        />
      </div>
      <button
        type="submit"
        class="px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Añadir evento
      </button>
    </form>
  `,
  styles: [],
})
export class FormComponent {
  fb = inject(FormBuilder);
  @Output() save = new EventEmitter();
  eventForm = this.fb.group({
    start: [null, Validators.required],
    title: ['', Validators.required],
  });

  onSubmit() {
    if (this.eventForm.valid) {
      this.save.emit(this.eventForm.value);
    }
    this.eventForm.reset();
  }
}
