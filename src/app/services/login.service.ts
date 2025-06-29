import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, BehaviorSubject, throwError, catchError } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class loginService {

  url : string = "https://notesappbackend-0h5w.onrender.com/login";
  currentUserSubject : BehaviorSubject<any>;
  error = false;

  constructor(private http: HttpClient, private ruta: Router) {
    console.log("el auth serv esta corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    if ( this.usuarioAutenticado){this.ruta.navigate(['/notes']);}
  }

  iniciarSesion(credenciales : any): Observable<any>
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
