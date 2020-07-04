import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http
      .get(environment.apiUrl + '/file_uploads')
      .pipe(map((data) => data['hydra:member']));
  }
}
