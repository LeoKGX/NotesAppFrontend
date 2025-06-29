import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Note } from '../model/note.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  urlNotes:string = "https://notesappbackend-0h5w.onrender.com/notes/getnotes";
  urlSaveNote:string = "https://notesappbackend-0h5w.onrender.com/notes/save";
  urlEditNote:string = "https://notesappbackend-0h5w.onrender.com/notes/update/";
  urlDeleteNote:string = "https://notesappbackend-0h5w.onrender.com/notes/delete/";


  constructor(private http:HttpClient) { }

  getDataNotes():Observable<any>{
    return this.http.get(this.urlNotes);
  }

  saveNote(note: Note):Observable<any>{
    return this.http.post(this.urlSaveNote,note);
  }

  editNote(newNote : Note, idNote: number):Observable<any>{
    return this.http.put(this.urlEditNote+idNote, newNote);
  }

  deleteNote(idNote: number):Observable<any>{
    return this.http.delete(this.urlDeleteNote+idNote.toString());
  }

}
