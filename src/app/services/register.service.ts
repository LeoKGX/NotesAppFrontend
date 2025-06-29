import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class registerService {

  url : string = "https://notesappbackend-0h5w.onrender.com/register";
  currentUserSubject : BehaviorSubject<any>;
  error = false;

  constructor(private http: HttpClient, private ruta: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    if ( this.usuarioAutenticado){this.ruta.navigate(['/notes']);}
  }

  register(credenciales : any): Observable<any>
  {
    return this.http.post(this.url, credenciales).pipe(map(data=> {

      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      this.ruta.navigate(['/notes']);
      return data;
    }
    ))
  }

  get usuarioAutenticado(){
      return this.currentUserSubject.value;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }

  userlogedin() : boolean{
      return (this.usuarioAutenticado && this.usuarioAutenticado.accessToken)
  }
}
