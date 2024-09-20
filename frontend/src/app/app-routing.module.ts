import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'funcionarios',
        loadComponent: () => import('./views/employee/employee-list/employee-list.component').then(m => m.EmployeeListComponent)
      },
      {
        path: 'funcionarios/new',
        loadComponent: () => import('./views/employee/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
      },
      {
        path: 'funcionarios/edit/:id',
        loadComponent: () => import('./views/employee/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
      },      
      {
        path: 'usuarios',
        loadComponent: () => import('./views/user/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'usuarios/edit/:id',
        loadComponent: () => import('./views/user/user-form/user-form.component').then(m => m.UserFormComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./views/login/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
