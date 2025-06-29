import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotesComponent } from './components/notes/notes.component';
import { GuardGuard } from './services/guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notes', component: NotesComponent, canActivate: [GuardGuard] },
  { path: '**', redirectTo: 'login' }
];