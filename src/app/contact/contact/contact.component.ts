import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  sent: boolean;
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  submitted = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }

    this.http
      .post(environment.apiUrl + '/contacts', {
        ...this.form.value,
        receiver: 'api/users/' + this.auth.user.id,
        sender: 'api/users/' + this.auth.user.id,

        channel: 'espace contact',
      })
      .subscribe(
        () => {
          // this.router.navigateByUrl('/');
          this.sent = true;
        },
        (e: HttpErrorResponse) => {
          if (e.status === 400 && e.error.violations) {
            for (const violation of e.error.violations) {
              const nomDuChamp = violation.propertyPath;
              const msg = violation.message;
              this.form.controls[nomDuChamp].setErrors({ invalid: msg });
              this.sent = false;
            }
          }
        }
      );
  }
}
