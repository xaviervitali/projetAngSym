import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  classes = ['PS', 'MS', 'GS', 'CP', 'CP/CE1', 'CE1', 'CE2', 'CM1', 'CM2'];
  gender = ['Mme', 'M'];
  classesSelected = [];

  form = new FormGroup({
    gender: new FormControl('', Validators.required),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    emailNotification: new FormControl(),
    about: new FormControl(''),
  });

  submitted = false;
  loading = false;
  error = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.loading = true;
    this.error = false;
    this.submitted = true;

    if (!this.form.invalid) {
      this.userService
        .create({
          ...this.form.value,
          children: this.classesSelected,
          granted: false,
        })
        .subscribe(
          (user) => {
            this.router.navigateByUrl('/login');
          },
          (e: HttpErrorResponse) => {
            if (e.status === 400 && e.error.violations) {
              // for (let violation of e.error.violations) {
              //   const nomDuChamp = violation.propertyPath;
              //   const message = violation.message;
              //   this.form.controls[nomDuChamp].setErrors({ invalid: message });
              //   this.loading = false;
              //   this.error = false;
              // }

              return;
            }
            this.error = true;
            this.loading = false;
          }
        );
    }
  }

  getErrorForControl(field: string) {
    return this.form.controls[field].getError('invalid');
  }

  hasErrors(field: string) {
    return (
      this.form.controls[field].invalid &&
      (this.submitted || this.form.controls[field].touched)
    );
  }
  handleChange(classe: any) {
    const classeSelectionnee = classe;

    if (this.classesSelected.includes(classeSelectionnee)) {
      const index = this.classesSelected.findIndex(
        (classe) => classe === classeSelectionnee
      );

      this.classesSelected.splice(index, 1);
    } else {
      this.classesSelected.push(classeSelectionnee);
    }
  }

  handleGender(gender: any) {
    this.form.controls.gender.setValue(gender);
  }
}
