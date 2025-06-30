import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { registerService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: registerService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordsMatchValidator });
  }

  onSubmit() {
    this.registerService.register(this.form.value).subscribe(
      data => {
        this.registerService.error = false;
        this.router.navigate(['/notes']);
      },
      () => {
        this.registerService.error = true;
        this.router.navigate(['/login']);
      }
    );
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirm = formGroup.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }


  ngOnInit(): void {
    this.registerService.getHealth().subscribe();
  }
}
