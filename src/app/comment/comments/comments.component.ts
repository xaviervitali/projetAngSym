import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  blockedComments = [];
  constructor(
    private commentService: CommentService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.commentService
      .findAll()
      .subscribe((comments) => (this.blockedComments = comments));
  }

  handleDelete(id) {
    const commentsCopy = { ...this.blockedComments };
    const index = this.blockedComments.findIndex((c) => c.id === id);
    this.blockedComments.splice(index, 1);
    this.commentService.delete(id).subscribe(
      () => '',
      () => (this.blockedComments = commentsCopy)
    );
  }
  handleUnblock(id) {
    const commentsCopy = { ...this.blockedComments };
    const comment = this.blockedComments.find((c) => c.id === id);
    this.blockedComments.splice(
      this.blockedComments.findIndex((c) => c.id == id),
      1
    );
    this.commentService
      .update({
        ...comment,
        blocked: null,
        author: comment.author['@id'],
        article: comment.article['@id'],
      })
      .subscribe(
        () => '',
        () => (this.blockedComments = commentsCopy)
      );
  }
}
