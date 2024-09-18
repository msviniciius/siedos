// Angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/guest/login']);
  }
}