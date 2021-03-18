import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment.prod';
import { pipe, VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ArticleViewComponent implements OnInit {
  article;
  errorMessage: string;
  submitted = false;
  comments = [];
  form = new FormGroup({
    content: new FormControl('', Validators.required),
  });
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
        switchMap((id) => this.articleService.find(id))
      )
      .subscribe(
        (data) => {
          this.article = data;
          if (!this.auth.hasRole('ROLE_SCHOOL')) {
            this.articleService
              .getCommentsFromArticle(this.article.slug)
              .subscribe(
                (comments) => (this.comments = comments),
                (e) => console.log(e)
              );
          }
        },
        (e) =>
          (this.errorMessage = "l'article demandé n'existe pas".toLocaleUpperCase())
      );
  }

  handleDelete() {
    this.articleService.delete(this.article.slug).subscribe(() => {
      this.router.navigateByUrl('/articles');
    });
  }
  handleSubmitComment() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const commentsCopy = { ...this.comments };
    const comment = {
      ...this.form.value,
      author: this.auth.user,
      createdAt: new Date(),
    };

    this.comments.push(comment);
    this.articleService
      .createComment({
        ...comment,
        author: environment.apiUrl + '/users/' + this.auth.user.id,
        article: environment.apiUrl + '/articles/' + this.article.slug,
      })
      .subscribe(
        (co: any) => {
          console.log(this.comments);

          this.comments.find((c) => c === comment).id = co.id;
        },
        (e) => {
          this.comments = commentsCopy;
        }
      );
  }

  handleBlockComment(c: any) {
    const commentsCopy = [...this.comments];
    this.comments.find((comment) => comment === c).blocked = this.auth.user.id;
    this.articleService.blockComment(c).subscribe(
      (comment: any) => {
        this.comments[c].blockComment = this.auth.user.id;
      },
      (error) => {
        this.comments = commentsCopy;
      }
    );
  }
  handleDeleteComment(c: any) {
    const commentsCopy = [...this.comments];
    const index = this.comments.indexOf(c);
    this.comments.splice(index, 1);
    this.articleService.deleteComment(c.id).subscribe(
      (comment: any) => {
        this.comments[c].id = comment.id;
      },
      (error) => {
        this.comments = commentsCopy;
      }
    );
  }
}
