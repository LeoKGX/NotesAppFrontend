import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Note } from '../../model/note.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './note-edit.html',
  styleUrl: './note-edit.scss'
})
export class NoteEdit {
  @Input() note!: Note;
  @Output() update = new EventEmitter<Note>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });
  }

  ngOnChanges() {
    if (this.note) {
      this.form.patchValue({
        title: this.note.title,
        content: this.note.content,
        tags: this.note.tags.map(t => t.name).join(', ')
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const { title, content, tags } = this.form.value;
      const updatedNote: Note = {
        ...this.note,
        title,
        content,
        tags: tags
          .split(',')
          .map((t: string) => ({ name: t.trim() }))
          .filter((t: any) => t.name)
      };
      this.update.emit(updatedNote);
    }
  }
  
  onCancel() {
    this.cancel.emit();
  }
  
  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.onCancel();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onCancel();
    }
  }
}

