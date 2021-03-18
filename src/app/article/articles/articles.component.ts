import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Category } from '../../category/category';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  categories: Category[];
  articles: Article[] = [];
  currentPage: number = 1;
  pages = [];
  itemsPerPage = 5;
  loadded: boolean;
  constructor(
    private articleService: ArticleService,
    public auth: AuthService,
    private categorieService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadded = false;
    this.articleService.findAll().subscribe(
      (articles) => {
        this.loadded = true;
        this.articles = articles;
      },
      (e) => (this.loadded = true)
    );
    this.categorieService.findAll().subscribe((cat) => (this.categories = cat));
  }

  getArticlesFromCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    return this.articles.slice(startIndex, this.itemsPerPage + startIndex);
  }

  removeHtmlTags(article: string) {
    return article.replace(/<[^>]*>/g, '').slice(0, 200) + '...';
  }
}
