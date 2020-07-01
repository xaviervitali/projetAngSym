import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterState,
  RouterStateSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { Article } from './article';
import { Observable } from 'rxjs';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesResolverService implements Resolve<Article[] | Article> {
  constructor(
    private articleService: ArticleService,
    private roure: ActivatedRoute
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article[] | Article> {
    if (route.paramMap.has('id')) {
      return this.articleService.find(+route.paramMap.get('id'));
    }
    return this.articleService.findAll();
  }
}
