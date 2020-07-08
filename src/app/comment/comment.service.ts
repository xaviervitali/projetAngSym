import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  findAll() {
    return this.http
      .get<Comment[]>(
        environment.apiUrl + '/comments?blocked=api/users/' + this.auth.user.id
      )
      .pipe(map((data) => data['hydra:member'] as Comment[]));
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/comments/' + id);
  }

  find(id: any) {
    return this.http.get<Comment>(environment.apiUrl + '/comments/' + id);
  }

  update(comment: Comment) {
    return this.http.put<Comment>(
      environment.apiUrl + '/comments/' + comment.id,
      comment
    );
  }

  create(comment: Comment) {
    return this.http.post<Comment>(environment.apiUrl + '/comments', comment);
  }
}

export interface Comment {
  id?: number;
  content: string;
  author: User[];
  comment: string;
  createdAt: string;
  blocked: User;
}
