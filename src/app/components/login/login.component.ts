import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error = false;
  constructor(private formbuilder: FormBuilder, private loginservice: loginService, private router: Router) {
    this.form = this.formbuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      deviceInfo: this.formbuilder.group({
        deviceId: [''],
        deviceType: [''],
        notificationToken: ['']
      })
    });
  }
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.error = this.loginservice.error;
  }
  get Username() { return this.form.get('username'); }
  get Password() { return this.form.get('password'); }
  onSend(event: Event) {
    event.preventDefault();
    this.loginservice.iniciarSesion(this.form.value).subscribe(
      () => {
        this.loginservice.error = false;
        this.router.navigate(['/notes']);
      },
      () => {
        this.loginservice.error = true;
        this.router.navigate(['/login']);
      }
    );
  }
}