import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AsyncSubject, Subject } from 'rxjs';
import { CategoryService } from 'src/app/category/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  private editorSubject: Subject<any> = new AsyncSubject();
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  submitted = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.http.post(environment.apiUrl + '/contacts', this.form.value).subscribe(
      () => {
        // this.router.navigateByUrl('/');
      },
      (e: HttpErrorResponse) => {
        if (e.status === 400 && e.error.violations) {
          for (const violation of e.error.violations) {
            const nomDuChamp = violation.propertyPath;
            const msg = violation.message;
            this.form.controls[nomDuChamp].setErrors({ invalid: msg });
          }
        }
      }
    );
  }
}
