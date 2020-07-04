import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Article } from '../article/article';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from './category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  findAll() {
    return this.http
      .get<Category[]>(environment.apiUrl + '/categories')
      .pipe(map((data) => data['hydra:member'] as Category[]));
  }

  find(id: any) {
    return this.http.get<Category>(environment.apiUrl + '/categories/' + id);
  }

  update(category: Category) {
    return this.http.put<Category>(
      environment.apiUrl + '/categories/' + category.id,
      category
    );
  }

  create(category: Category) {
    return this.http.post<Category>(
      environment.apiUrl + '/categories',
      category
    );
  }
  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/categories/' + id);
  }
}
