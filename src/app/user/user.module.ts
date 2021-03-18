import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserShowComponent } from './user-show/user-show.component';
import { RolePipe } from '../role.pipe';
@NgModule({
  declarations: [UserShowComponent, RolePipe],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserModule {}
