import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/article/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Article } from 'src/app/article/article';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css'],
})
export class ViewArticlesComponent implements OnInit {
  articles: Article[];
  errorMessage: string;
  submitted = false;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => this.articleService.getCategoryArticle(+id))
      )
      .subscribe((articles) => (this.articles = articles));
  }
}
