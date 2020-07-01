import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export interface Flash {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UiService {

  flashSubject = new Subject<Flash>()
  loadingSubject = new Subject<boolean>()

  constructor() { }

  fillViolationsInForm(form: FormGroup, violations: ApiViolation[]) {
    for (const violation of violations) {
      form.controls[violation.propertyPath].setErrors({ 'invalid': violation.message })
    }
  }

  setloading(loading: boolean) {
    this.loadingSubject.next(loading)
  }

  addFlash(type: string, message: string) {
    this.flashSubject.next({
      type,
      message
    })
  }
}

interface ApiViolation {
  propertyPath: string,
  message: string
}
