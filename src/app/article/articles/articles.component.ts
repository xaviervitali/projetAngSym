import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  categories: Category[];
  articles: Article[] = [];
  loading = false;
  error = false;
  constructor(
    private articleService: ArticleService,
    private ui: UiService,
    private activatedRoute: ActivatedRoute,
    public auth: AuthService
  ) {}
  currentPage: number = 1;
  pages = [];
  itemsPerPage = 5;

  ngOnInit(): void {
    this.articles = this.activatedRoute.snapshot.data.article;
    this.articleService
      .findCategories()
      .subscribe((cat) => (this.categories = cat));
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
  ngOnDestroy() {}
}
