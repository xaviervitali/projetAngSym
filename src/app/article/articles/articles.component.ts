import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../category/category';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryService } from 'src/app/category/category.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  categories: Category[];
  articles: Article[] = [];
  loading = false;
  error = false;
  currentPage: number = 1;
  pages = [];
  itemsPerPage = 5;
  form = new FormGroup({
    title: new FormControl(''),
  });
  constructor(
    private articleService: ArticleService,
    private ui: UiService,
    private activatedRoute: ActivatedRoute,
    public auth: AuthService,
    private categorieService: CategoryService
  ) {}

  ngOnInit(): void {
    this.articles = this.activatedRoute.snapshot.data.article;
    this.categorieService.findAll().subscribe((cat) => (this.categories = cat));
  }

  getArticlesFromCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    return this.articles.slice(startIndex, this.itemsPerPage + startIndex);
  }
  handleDelete(article: Article) {
    this.ui.setloading(true);
    const articlesCopy = [...this.articles];
    const index = this.articles.indexOf(article);
    this.articles.splice(index, 1);
    this.articleService.delete(article.id).subscribe(
      (success) => {
        this.error = false;
        this.ui.setloading(false);
      },
      (error) => {
        this.error = true;
        this.articles = articlesCopy;
      }
    );
  }
  handleDeleteCategory(id) {
    const categoriesCopy = { ...this.categories };
    this.categories.splice(
      this.categories.findIndex((cat) => cat.id === id),
      1
    );

    this.categorieService.delete(id).subscribe(
      () => '',
      () => (this.categories = categoriesCopy)
    );
  }
  handleSubmitCategory() {
    const catCopy = { ...this.categories };
    this.categorieService.create(this.form.value).subscribe(
      (category) => {
        this.categories.push(category);
      },
      (e) => {
        this.categories = catCopy;
      }
    );
  }
}
