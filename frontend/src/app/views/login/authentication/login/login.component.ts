// angular import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false
  saving: boolean = false;
  emailValid: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public async onLogin() {
    if (!this.loginForm.valid) return;
    
    this.saving = true;

    this.authService
    .login(this.loginForm.value)
    .pipe(finalize(() => this.saving = false))
    .subscribe({
      next: () => {
        this.toastr.success('Login realizado sucesso!', 'Login');
        this.router.navigate(['/funcionarios']);
      },
      error: (e) => this.toastr.error('Verifique seus dados de acesso.', 'Login'),
    });
  }  

  onEmailInput() {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      this.authService.checkEmail({ email }).subscribe({
        next: (response) => {
          if (response) {
            this.emailValid = true;
          } else {
            this.emailValid = false;
          }
        },
        error: (err) => {
          this.emailValid = false;
        }
      });
    }
  }

  get isFormValid(): boolean {
    return this.loginForm.valid && this.emailValid;
  }
}