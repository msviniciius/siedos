import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthenticationModule {}
