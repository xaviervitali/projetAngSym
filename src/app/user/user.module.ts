import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserShowComponent } from './user-show/user-show.component';

@NgModule({
  declarations: [UserShowComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserModule {}
