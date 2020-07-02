import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../category';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  category: Category;
  form = new FormGroup({
    title: new FormControl(''),
  });
  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => +params.get('id')),
        switchMap((id) => this.categoryService.find(id))
      )
      .subscribe((category) => {
        this.category = category;
        this.form.patchValue(this.category);
      });
  }

  handleSubmit() {
    this.submitted = true;
    this.categoryService
      .update({ ...this.form.value, id: this.category.id })
      .subscribe(
        (category) => {
          this.router.navigateByUrl('/');
        },
        (e: HttpErrorResponse) => {}
      );
  }
}
