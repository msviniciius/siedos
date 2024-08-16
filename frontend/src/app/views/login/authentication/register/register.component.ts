import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false
  saving: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  onRedirectCreate() {
    this.router.navigate(['quest/login']);
  }

  public async onRegistration() {
    if (!this.registerForm.valid) return;
    
    this.saving = true;

    this.authService
    .register(this.registerForm.value)
    .pipe(finalize(() => this.saving = false))
    .subscribe({
      next: () => {
        this.toastr.success('Usuario cadastrado com sucesso!', 'Login');
        this.router.navigate(['/funcionarios']);
      },
      error: (e) => this.toastr.error(e),
    });
  }
}
