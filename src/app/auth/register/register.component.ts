import { Component, OnInit, OnChanges } from '@angular/core';
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
  classesSelected = [];
  form = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmation: new FormControl('', Validators.required),
    classes: new FormControl(this.classesSelected, Validators.required),
  });

  submitted = false;
  loading = false;
  error = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.loading = true;
    this.error = false;

    this.userService.create(this.form.value).subscribe(
      (user) => {
        this.router.navigateByUrl('/login');
      },
      (e: HttpErrorResponse) => {
        if (e.status === 400 && e.error.violation) {
          for (let violation of e.error.violations) {
            const nomDuChamp = violation.propertyPath;
            const message = violation.message;
            this.form.controls[nomDuChamp].setErrors({ invalid: message });
            this.loading = false;
            this.error = false;
          }
          return;
        }
        this.error = true;
        this.loading = false;
      }
    );
  }

  getErrorForControl(field: string) {
    return this.form.controls[field].getError('invalid');
  }

  handleChange(classe: any) {
    const classeSelectionnee = classe.target.value;
    if (this.classesSelected.includes(classeSelectionnee)) {
      const index = this.classesSelected.findIndex(
        (classe) => classe === classeSelectionnee
      );

      this.classesSelected.splice(index, 1);
    } else {
      this.classesSelected.push(classeSelectionnee);
    }
  }
}
