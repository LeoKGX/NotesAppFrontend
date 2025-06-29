import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-note',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-note.html',
  styleUrl: './new-note.scss'
})
export class NewNote {
@Output() noteCreated = new EventEmitter<any>();

  creating = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });
  }

  startCreating() {
    this.creating = true;
  }

  cancel() {
    this.creating = false;
    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      const raw = this.form.value;
      const note = {
        title: raw.title,
        content: raw.content,
        tags: raw.tags
          .split(',')
          .map((t: string) => ({ name: t.trim() }))
          .filter((t: any) => t.name)
      };
      this.noteCreated.emit(note);
      this.cancel();
    }
  }
}
