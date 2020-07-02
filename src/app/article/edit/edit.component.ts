import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/ui/ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../category/category';
import { map, switchMap } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class ArticleEditComponent implements OnInit {
  categories$: Observable<Category[]>;

  article: Article;
  form = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    category: new FormControl(''),
  });
  submitted = false;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.findAll();

    this.activatedRoute.paramMap
      .pipe(
        map((params) => +params.get('id')),
        switchMap((id) => this.articleService.find(id)),
        map((article) => {
          return {
            ...article,
            category: `/api/categories/${(article.category as Category).id}`,
          };
        })
      )
      .subscribe((article) => {
        this.article = article;
        this.form.patchValue(this.article);
      });
  }

  handleSubmit() {
    this.submitted = true;
    this.articleService
      .update({ ...this.form.value, id: this.article.id })
      .subscribe(
        (article) => {
          this.router.navigateByUrl('/');
        },
        (e: HttpErrorResponse) => {}
      );
  }
}
