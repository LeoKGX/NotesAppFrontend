import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { loginService } from '../../services/login.service';
import { Note } from '../../model/note.model';
import { NoteComponent } from '../note/note.component';
import { CommonModule } from '@angular/common';
import { Logout } from '../logout/logout';
import { NewNote } from '../new-note/new-note';
import { NoteEdit } from '../note-edit/note-edit';
import { NoteFilter } from '../note-filter/note-filter';
import { SwitchToggle } from '../switch-toggle/switch-toggle';

@Component({
  selector: 'app-notes',
  imports: [
    CommonModule,
    NoteComponent,
    NewNote,
    NoteEdit,
    NoteFilter,
    SwitchToggle,
    Logout
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  constructor(private notesData: DataService, private loginService: loginService) { }
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  allTags: { id: number; name: string }[] = [];
  selectedTagIds: number[] = [];
  noteToEdit: Note | null = null;
  originalNoteState: Note | null = null;
  showArchived: boolean = false;
  successMessage: string | null = null;
  messageType: 'success' | 'info' | 'error' | null = null;

  
  ngOnInit(): void {
    this.fetchNotes();
  }

  crearNota(newNote: any) {
    this.notesData.saveNote(newNote).subscribe(() => {
      this.successMessage = 'Nota creada con éxito';
      this.messageType = 'info';
      this.fetchNotes(); 
      this.clearMessageAfterDelay();
    });
  }

  onNoteEdit(note: Note) {
    this.originalNoteState = { ...note }; 
    this.noteToEdit = { ...note };        
  }

  onNoteDelete(id: number) {
    this.notesData.deleteNote(id).subscribe(() => {
      this.successMessage = 'Nota eliminada con éxito';
      this.messageType = 'error';
      this.fetchNotes();
      this.clearMessageAfterDelay();
      this.fetchNotes() 
  });
  }

  onNoteUpdate(updatedNote: Note) {
    const originalNote = this.notes.find(n => n.id === updatedNote.id);
    const wasArchived = originalNote?.archived;

    this.notesData.editNote(updatedNote, updatedNote.id).subscribe({
      next: () => {
        if (wasArchived !== undefined && updatedNote.archived !== wasArchived) {
          this.successMessage = updatedNote.archived
            ? 'Nota archivada con éxito'
            : 'Nota desarchivada con éxito';
          this.messageType = 'success';
        } else {
          this.successMessage = 'Nota actualizada con éxito';
          this.messageType = 'info';
        }

        this.clearMessageAfterDelay();

        this.noteToEdit = null;
        this.originalNoteState = null;
        this.fetchNotes();
      },
      error: (err) => {
        console.error('Error al actualizar la nota', err);
        alert('Hubo un error al actualizar la nota.');
      }
    });
  }


  fetchNotes() {
    this.notesData.getDataNotes().subscribe(notes => {
      this.notes = notes;
      const tagsMap = new Map<number, string>();
      this.notes.forEach(note => {
        note.tags.forEach(tag => {
          tagsMap.set(tag.id, tag.name);
        });
      });
      this.allTags = Array.from(tagsMap, ([id, name]) => ({ id, name }));

      this.applyFilter();
    });

    
  }


  applyFilter() {
    const filteredByTags = this.selectedTagIds.length === 0
      ? this.notes
      : this.notes.filter(note =>
        note.tags.some(tag => this.selectedTagIds.includes(tag.id))
      );

      this.filteredNotes = filteredByTags.filter(note =>
      note.archived === this.showArchived
    );
  }

  toggleArchived() {
    this.showArchived = !this.showArchived;
    this.applyFilter();
  }

  onFilterChanged(selectedTagIds: number[]) {
      this.selectedTagIds = selectedTagIds;
      this.applyFilter();
  }

  clearMessageAfterDelay() {
    setTimeout(() => {
      this.successMessage = null;
      this.messageType = null;
    }, 3000);
  }  
}
