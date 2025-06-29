import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { Note } from '../../model/note.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  imports: 
  [
    CommonModule
  ],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() note!: Note;

  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<number>();
  @Output() archiveToggled = new EventEmitter<Note>();
  @ViewChild('contentRef') contentRef!: ElementRef;


  onEdit() {
    this.edit.emit(this.note);
  }

  onDelete() {
    if (confirm('¿Estás seguro de eliminar esta nota?')) {
      this.delete.emit(this.note.id);
    }
  }

  toggleArchive() {
    const updatedNote = {
      ...this.note,
      archived: !this.note.archived
    };
    this.archiveToggled.emit(updatedNote);
  }

}