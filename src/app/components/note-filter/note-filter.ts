import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-note-filter',
  imports: [
    CommonModule,
  ],
  templateUrl: './note-filter.html',
  styleUrl: './note-filter.scss'
})
export class NoteFilter {

  @Input() tags: { id: number; name: string }[] = [];
  @Output() filterChanged = new EventEmitter<number[]>(); // array de ids de tags seleccionados

  selectedTagIds = new Set<number>();

  toggleTag(tagId: number) {
    if (this.selectedTagIds.has(tagId)) {
      this.selectedTagIds.delete(tagId);
    } else {
      this.selectedTagIds.add(tagId);
    }
    this.filterChanged.emit(Array.from(this.selectedTagIds));
  }

  isSelected(tagId: number) {
    return this.selectedTagIds.has(tagId);
  }

}
