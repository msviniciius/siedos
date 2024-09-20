// angular import
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user/user.service';
import { BasicService, Basic } from '../../../services/basic/basic.service';
import { finalize, pipe } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() save = new EventEmitter<UserService.User>();

  loading: boolean = false;
  userForm: FormGroup;
  saving: boolean = false;
  toastService: any;
  userId: string;
  userRoles: Basic[] = [];

  additionalForm: FormGroup;

  constructor(
    private userService: UserService,
    private basicService: BasicService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUserData(this.userId);
    }

    this.loadUserRole();

    this.userForm = this.fb.group({
      email: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  loadUserRole(): void {
    this.loading = true;

    this.basicService.getUserRoles()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.userRoles = data;
        },
        error: (e) => this.toastService.error(e),
      });
  }

  public async validateForm(form) {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return false;
    }
  
    form.classList.add('was-validated');
    return true;
  }

  public async onUpdate() {
    const formData = this.userForm.getRawValue();
    this.loading = true;

    try {
      await this.userService.updateUser(this.userId, formData);

      this.loading = false;
      this.toastr.success('Usuário atualizado com sucesso!', 'Usuário');
      this.router.navigate(['/usuarios']);
    } catch (error) {
      this.toastr.error('Usuário não foi atualizado!', 'Usuário');
      console.log(error);
      this.loading = false;
    }
  }

  public async loadUserData(userId: string) {
    try {
      const user = await this.userService.getOneUser(userId);

      this.userForm.patchValue({
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  cancelUser(): void {
    this.router.navigate(['/usuarios']);
  }
}