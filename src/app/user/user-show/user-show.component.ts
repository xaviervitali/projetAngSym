import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { User } from 'src/app/auth/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css'],
})
export class UserShowComponent implements OnInit {
  classesSelected = [];
  classes = ['PS', 'MS', 'GS', 'CP', 'CP/CE1', 'CE1', 'CE2', 'CM1', 'CM2'];

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
          (user) => {},
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

  translateRole(role) {
    const roles = {
      ROLE_ADMIN: `Administrateur du site : En tant que tel vous pouvez acceder à la page d'administation, supprimer un article, bloquer des commentaires, modifier la catégorie d'un article, et en créer `,
      ROLE_MODERATOR: `Modérateur : En tant que tel supprimer un article, bloquer des commentaires, modifier la catégorie d'un article, en créer  et en supprimer`,
      ROLE_WRITTER:
        "Auteur d'articles : En tant que tel vous pouvez créer des articles,  modifier l'intégralité de vos articles et bloquer les commentaires liés ",
      ROLE_USER: 'Vous pouvez consulter tous les articles et les commenter',
      ROLE_SCHOOL: 'Vous pouvez consulter tous les articles',
    };
    return roles[role];
  }
}
