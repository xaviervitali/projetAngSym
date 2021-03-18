import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { User } from 'src/app/auth/user';
import { HttpErrorResponse } from '@angular/common/http';
import { RolePipe } from 'src/app/role.pipe';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css'],
})
export class UserShowComponent implements OnInit {
  classesSelected = [];
  classes = ['PS', 'MS', 'GS', 'CP', 'CP/CE1', 'CE1', 'CE2', 'CM1', 'CM2'];
  updated = false;
  @Input()
  password: string;

  user: User;
  submitted = false;
  form = new FormGroup({
    lastName: new FormControl([Validators.minLength(2), Validators.required]),
    firstName: new FormControl([Validators.minLength(2), Validators.required]),
    username: new FormControl([Validators.email, Validators.required]),
    emailNotification: new FormControl([]),
  });
  constructor(private userService: UserService, public auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.user;
    delete this.user.password;
    this.classesSelected = this.auth.user.children;

    this.form.patchValue({ ...this.user });
  }

  handleLogout() {
    this.auth.logout();
  }

  handleSubmit() {
    this.submitted = true;

    if (!this.form.invalid) {
      this.userService
        .update({
          ...this.user,
          ...this.form.value,
          children: this.classesSelected,
          email: this.form.controls.username.value,
        })
        .subscribe(
          (user) => {
            this.updated = true;
          },
          (e: HttpErrorResponse) => {
            if (e.status === 400 && e.error.violations) {
              for (let violation of e.error.violations) {
                const nomDuChamp = violation.propertyPath;
                const message = violation.message;
                this.form.controls[nomDuChamp].setErrors({ invalid: message });
              }

              return;
            }
          }
        );
    }
  }

  getErrorForControl(field: string) {
    return this.form.controls[field].getError('invalid');
  }

  handleChange(classe: any) {
    if (this.classesSelected.includes(classe)) {
      const index = this.classesSelected.findIndex((child) => child === classe);

      this.classesSelected.splice(index, 1);
    } else {
      this.classesSelected.push(classe);
    }
  }

  handleGender(gender: any) {
    this.form.controls.gender.setValue(gender);
  }
}
