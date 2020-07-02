import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Article } from './article';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  findAll() {
    return this.http
      .get<Article[]>(environment.apiUrl + '/articles')
      .pipe(map((data) => data['hydra:member'] as Article[]));
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/articles/' + id);
  }

  find(id: any) {
    return this.http.get<Article>(environment.apiUrl + '/articles/' + id);
  }

  update(article: Article) {
    return this.http.put<Article>(
      environment.apiUrl + '/articles/' + article.id,
      article
    );
  }

  create(article: Article) {
    return this.http.post<Article>(environment.apiUrl + '/articles', article);
  }

  findCategory(id: number) {
    return this.http.get<Category>(environment.apiUrl + '/categories/' + id);
  }

  createComment(comment: Comment) {
    return this.http.post<Comment>(environment.apiUrl + '/comments', comment);
  }

  deleteComment(id: number) {
    return this.http.delete(environment.apiUrl + '/comments/' + id);
  }

  blockComment(comment: any) {
    return this.http.put<Comment>(
      environment.apiUrl + '/comments/' + comment.id,
      {
        ...comment,
        blocked: environment.apiUrl + '/users/' + this.auth.user.id,
        author: environment.apiUrl + '/users/' + comment.author.id,
      }
    );
  }

  getCategoryArticle(id: number) {
    return this.http
      .get<Article[]>(environment.apiUrl + '/articles?category=' + id)
      .pipe(map((data) => data['hydra:member'] as Article[]));
  }
}
